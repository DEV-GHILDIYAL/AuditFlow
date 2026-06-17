const XLSX = require('xlsx');

// Create sheet data: 2D array demonstrating irregular structures
const data = [
  // Section 0: Irrelevant headers/metadata at the very top
  ["Audit Template Info", "", "", "Version 2.4", "", "", "", ""],
  ["Generated on: 2026-06-16", "", "", "", "", "", "", ""],
  [],
  // Section 1: Headers are in row 4 (0-indexed 3) with casing irregularities
  ["COUNTRY", "lAnGuAgE", "Placement", "pattern", "HEADING COPY", "body copy", "call to action copy", "Link to website"],
  ["United States", "English", "Hero banner", "hero-v1", "Welcome to AuditFlow", "Streamline your digital audits with automated parser tools.", "Try Free", "https://auditflow.dev"],
  ["Canada", "French", "Hero banner", "hero-v1", "Bienvenue à AuditFlow", "Optimisez vos audits numériques avec nos outils d'analyse automatique.", "Essai gratuit", "https://auditflow.ca"],
  [], // Blank row to end Section 1
  [], // Another blank row for spacing
  // Section 2: Noise rows
  ["Notes: please check character limits carefully", "", "", "", "", "", "", ""],
  [],
  // Section 2 Header: Starts at row 11 (0-indexed 10)
  ["Country", "Language", "Placement", "Pattern", "Heading copy", "Body copy", "Call to action copy", "Link to website"],
  ["United Kingdom", "English", "Footer", "footer-v2", "Compliance is Key", "Keep your site contents conforming to compliance rules.", "Learn More", "auditflow.co.uk"],
  ["Germany", "German", "Footer", "footer-v2", "Compliance ist der Schlüssel", "Halten Sie Ihre Website-Inhalte konform mit den Compliance-Regeln.", "Mehr erfahren", "auditflow.de"],
  [], // Blank row to end Section 2
  ["End of report", "", "", "", "", "", "", ""]
];

const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "AuditData");
XLSX.writeFile(wb, "test-irregular.xlsx");
console.log("Mock Excel file test-irregular.xlsx created successfully!");
