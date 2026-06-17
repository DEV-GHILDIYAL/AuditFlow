const XLSX = require('xlsx');

// 10 localized audit rows corresponding to the generated website files
const data = [
  // Headers matching standard AuditFlow irregular structures requirement
  [
    "Country", 
    "Language", 
    "Placement", 
    "Pattern", 
    "Heading copy", 
    "Body copy", 
    "Call to action copy", 
    "Link to website"
  ],
  [
    "United States",
    "English",
    "Hero Section",
    "hero-v1",
    "Vishnuvogue: Dharavi's Finest Vogue",
    "Handcrafted premium shirts and modern kurtas, blending Mumbai's rich craftsmanship with contemporary global styles.",
    "Explore Collection",
    "http://localhost:5173/vishnuvogue/us-en.html"
  ],
  [
    "India",
    "Hindi",
    "Hero Section",
    "hero-v1",
    "विष्णुवोग: धारावी का बेहतरीन परिधान",
    "मुंबई के समृद्ध हस्तशिल्प और समकालीन वैश्विक डिजाइनों का एक सुंदर मिश्रण, विशेष रूप से तैयार किया गया।",
    "संग्रह का अन्वेषण करें",
    "http://localhost:5173/vishnuvogue/in-hi.html"
  ],
  [
    "United Kingdom",
    "English",
    "Hero Section",
    "hero-v1",
    "Vishnuvogue: London's Dharavi Edit",
    "Bespoke artisanal menswear and traditional fabrics direct from Mumbai's creative heart to London.",
    "Discover Edit",
    "http://localhost:5173/vishnuvogue/uk-en.html"
  ],
  [
    "France",
    "French",
    "Hero Section",
    "hero-v1",
    "Vishnuvogue: L'art du textile de Dharavi",
    "Des créations haut de gamme alliant le savoir-faire indien ancestral et l'élégance parisienne contemporaine.",
    "Découvrir la mode",
    "http://localhost:5173/vishnuvogue/fr-fr.html"
  ],
  [
    "Germany",
    "German",
    "Hero Section",
    "hero-v1",
    "Vishnuvogue: Dharavis Premium Textilien",
    "Feinste handgefertigte Hemden und Designer-Kurtas, die indische Tradition und modernen Stil vereinen.",
    "Kollektion ansehen",
    "http://localhost:5173/vishnuvogue/de-de.html"
  ],
  [
    "Spain",
    "Spanish",
    "Hero Section",
    "hero-v1",
    "Vishnuvogue: Alta Costura de Dharavi",
    "Diseños artesanales exclusivos que fusionan el alma de Bombay con la moda urbana europea.",
    "Ver Colección",
    "http://localhost:5173/vishnuvogue/es-es.html"
  ],
  [
    "Italy",
    "Italian",
    "Hero Section",
    "hero-v1",
    "Vishnuvogue: Sartoria Dharavi di Lusso",
    "Camicie ricamate e abiti tradizionali rifiniti a mano nei laboratori storici di Mumbai.",
    "Esplora il Lusso",
    "http://localhost:5173/vishnuvogue/it-it.html"
  ],
  [
    "Japan",
    "Japanese",
    "Hero Section",
    "hero-v1",
    "ヴィシュヌヴォーグ：ムンバイの極上布地",
    "ダラヴィ地区の伝統的な職人技で作られた、現代的なシルエットを持つ高品質メンズシャツ＆インド服。",
    "コレクションを見る",
    "http://localhost:5173/vishnuvogue/jp-ja.html"
  ],
  [
    "United Arab Emirates",
    "Arabic",
    "Hero Section",
    "hero-v1",
    "فيشنوفوغ: أقمشة دهراري الفاخرة",
    "قمصان مصممة يدوياً وبدلات كورتا أنيقة تجمع بين التراث الهندي العريق والذوق العربي الرفيع.",
    "تسوق التشكيلة",
    "http://localhost:5173/vishnuvogue/ae-ar.html"
  ],
  [
    "Australia",
    "English",
    "Hero Section",
    "hero-v1",
    "Vishnuvogue: Heritage Couture of Mumbai",
    "Lightweight linen, organic cotton, and embroidered shirts curated by Deepak Mahato for Australian summers.",
    "Browse Collection",
    "http://localhost:5173/vishnuvogue/au-en.html"
  ]
];

const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Vishnuvogue Audit");
XLSX.writeFile(wb, "vishnuvogue_audit.xlsx");
console.log("Successfully created vishnuvogue_audit.xlsx");
