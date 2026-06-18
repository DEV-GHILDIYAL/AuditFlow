import type { ParsedRow } from './excelParser';

export interface AuditResult {
  status: 'pending' | 'running' | 'pass' | 'fail' | 'error' | 'skipped';
  heading: boolean | 'skipped';
  body: boolean | 'skipped';
  ctaText: boolean | 'skipped';
  ctaUrl: boolean | 'skipped';
  error?: string;
}

/**
 * Normalizes a URL, prepending https:// if a protocol is missing.
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Resolves relative URLs against a base page URL.
 */
export function resolveUrl(basePageUrl: string, href: string): string {
  try {
    return new URL(href, basePageUrl).href;
  } catch (e) {
    return href;
  }
}

/**
 * Normalizes a URL for comparison, removing protocol, www., and trailing slash.
 */
function cleanUrlForComparison(url: string): string {
  let s = url.trim().toLowerCase();
  s = s.replace(/^(https?:)?\/\//, '');
  s = s.replace(/^www\./, '');
  if (s.endsWith('/')) {
    s = s.slice(0, -1);
  }
  return s;
}

/**
 * Compares two URLs to see if they refer to the same resource.
 */
export function compareUrls(url1: string, url2: string, basePageUrl?: string): boolean {
  let resolved1 = url1;
  let resolved2 = url2;
  
  if (basePageUrl) {
    resolved1 = resolveUrl(basePageUrl, url1);
    resolved2 = resolveUrl(basePageUrl, url2);
  }

  return cleanUrlForComparison(resolved1) === cleanUrlForComparison(resolved2);
}

/**
 * Recursively extracts all visible text content from a DOM node.
 * Ignores scripts, styles, iframe, svg, noscript, and head.
 */
export function getVisibleText(node: Node): string {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = (node as Element).tagName.toUpperCase();
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'SVG', 'HEAD'].includes(tagName)) {
      return '';
    }
  }
  
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }
  
  let text = '';
  for (let child = node.firstChild; child; child = child.nextSibling) {
    text += ' ' + getVisibleText(child);
  }
  return text;
}

/**
 * Runs the compliance audits for a single parsed row by fetching its URL.
 */
export async function runAuditForRow(row: ParsedRow): Promise<AuditResult> {
  const targetUrlColumn = row['Url'];

  // Check 1: Empty website URL cell -> Skip row, mark all checks as Skipped
  if (!targetUrlColumn || targetUrlColumn.trim() === '') {
    return {
      status: 'skipped',
      heading: 'skipped',
      body: 'skipped',
      ctaText: 'skipped',
      ctaUrl: 'skipped',
      error: 'Skipped: Url is empty'
    };
  }

  const targetUrl = normalizeUrl(targetUrlColumn);
  const isLocalhost = targetUrl.includes('localhost') || targetUrl.includes('127.0.0.1');
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000); // 15 seconds fetch timeout

  try {
    let htmlString = '';
    if (isLocalhost) {
      const res = await fetch(targetUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) {
        throw new Error(`Local host responded with status ${res.status}`);
      }
      htmlString = await res.text();
    } else {
      const res = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) {
        throw new Error(`Proxy responded with status ${res.status}`);
      }
      const json = await res.json();
      htmlString = json?.contents;
    }

    // Check 2: Empty or Non-HTML content checks
    if (htmlString === null || htmlString === undefined || htmlString.trim() === '') {
      return {
        status: 'error',
        heading: false,
        body: false,
        ctaText: false,
        ctaUrl: false,
        error: 'Invalid page'
      };
    }

    // Check if the page is HTML format
    const lowerHtml = htmlString.toLowerCase();
    const isHtml = lowerHtml.includes('<html') || lowerHtml.includes('<body') || lowerHtml.includes('<div');
    if (!isHtml) {
      return {
        status: 'error',
        heading: false,
        body: false,
        ctaText: false,
        ctaUrl: false,
        error: 'Invalid page'
      };
    }

    const doc = new DOMParser().parseFromString(htmlString, 'text/html');

    // Parse Error Check in DOMParser
    if (doc.getElementsByTagName('parsererror').length > 0) {
      return {
        status: 'error',
        heading: false,
        body: false,
        ctaText: false,
        ctaUrl: false,
        error: 'Invalid page'
      };
    }

    // 1. Get the visible text of the document
    const bodyText = getVisibleText(doc.body || doc.documentElement);
    const cleanedBodyText = bodyText.replace(/\s+/g, ' ').trim().toLowerCase();

    // Perform checks (all trimmed, case-insensitive)
    const targetHeading = (row['Heading copy'] || '').trim().toLowerCase();
    const targetBody = (row['Body copy'] || '').trim().toLowerCase();
    const targetCta = (row['Call to action copy'] || '').trim().toLowerCase();

    // Check 1: Heading Check (is it present anywhere in the visible DOM text?)
    const headingPass = targetHeading === '' ? true : cleanedBodyText.includes(targetHeading);

    // Check 2: Body Check (is it present anywhere in the visible DOM text?)
    const bodyPass = targetBody === '' ? true : cleanedBodyText.includes(targetBody);

    // Check 3 & 4: CTA and URL checks
    // Find all potential interactive elements: links, buttons, role="button", and inputs
    const interactiveElements = doc.querySelectorAll('a, button, [role="button"], input[type="button"], input[type="submit"]');
    
    // Find elements whose visible text exactly matches the Call to action copy
    const matchingCtaElements = Array.from(interactiveElements).filter(el => {
      const elText = getVisibleText(el).replace(/\s+/g, ' ').trim().toLowerCase();
      return elText === targetCta;
    });

    const ctaTextPass = targetCta === '' ? true : matchingCtaElements.length > 0;

    // Button URL Check: does at least one matching CTA element point to the correct Link to?
    // Relative paths are resolved against targetUrl inside compareUrls
    let ctaUrlPass = false;
    if (targetCta === '') {
      ctaUrlPass = true;
    } else if (matchingCtaElements.length > 0) {
      ctaUrlPass = matchingCtaElements.some(el => {
        let href = el.getAttribute('href') || '';
        if (!href && el.tagName.toUpperCase() === 'INPUT') {
          href = el.getAttribute('formaction') || '';
        }
        if (!href) {
          href = el.getAttribute('data-href') || '';
        }
        return compareUrls(href, row['Link to'], targetUrl);
      });
    }

    const isAllPass = headingPass && bodyPass && ctaTextPass && ctaUrlPass;

    return {
      status: isAllPass ? 'pass' : 'fail',
      heading: headingPass,
      body: bodyPass,
      ctaText: ctaTextPass,
      ctaUrl: ctaUrlPass
    };

  } catch (err: any) {
    clearTimeout(timeoutId);
    let errorMessage = err instanceof Error ? err.message : String(err);
    if (err.name === 'AbortError') {
      errorMessage = 'Fetch failed';
    } else if (errorMessage.toLowerCase().includes('fetch')) {
      errorMessage = 'Fetch failed';
    }
    return {
      status: 'error',
      heading: false,
      body: false,
      ctaText: false,
      ctaUrl: false,
      error: errorMessage
    };
  }
}
