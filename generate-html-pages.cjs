const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'vishnuvogue');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Localized translation blocks
const pages = [
  {
    fileName: 'us-en.html',
    lang: 'en',
    dir: 'ltr',
    title: 'Vishnuvogue - United States (English)',
    heading: "Vishnuvogue: Dharavi's Finest Vogue",
    body: "Handcrafted premium shirts and modern kurtas, blending Mumbai's rich craftsmanship with contemporary global styles.",
    cta: "Explore Collection",
    url: "http://localhost:5173/vishnuvogue/us-en.html",
    aboutTitle: "About The Maker",
    aboutText: "Founded by Deepak Mahato, Vishnuvogue is located in Dharavi, Mumbai. We take pride in showcasing the resilient artistry of local handloom weavers who spend generations perfecting the craft.",
    kurtas: "Designer Kurtas",
    shirts: "Premium Shirts",
    sarees: "Modern Streetwear",
    navHome: "Home",
    navCollection: "Collection",
    navAbout: "About Us",
    navContact: "Contact",
    contactHeader: "Get In Touch",
    ownerLabel: "Owner",
    priceText: "Price on request",
    faqTitle: "Frequently Asked Questions",
    q1: "What materials do you use?",
    a1: "We use 100% organic cotton, hand-spun linen, and pure Mulberry silk sourced ethically from local Indian weavers.",
    q2: "Do you ship internationally?",
    a2: "Yes, we ship globally from Mumbai. Customs and shipping rates are calculated at checkout.",
    testimonialTitle: "Global Accolades",
    t1Text: "“The embroidery on the Kurta is absolutely breathtaking. You can feel the Dharavi craftsmanship in every stitch.”",
    t1Author: "Sarah Jenkins, NY Fashion Critic",
    t2Text: "“Vishnuvogue's linen shirts are my absolute summer staple. Lightweight, breathable, and highly tailored.”",
    t2Author: "David Miller, London Designer",
    formName: "Full Name",
    formEmail: "Email Address",
    formMsg: "Tell us about your style preference...",
    formSubmit: "Send Message",
    successMsg: "Thank you! Deepak Mahato will contact you shortly.",
    lookbookTitle: "Season Lookbook",
    lookbookSubtitle: "Curated collections capturing the spirit of Mumbai street fashion and royal heritage",
    pillar1Title: "Artisanal Integrity",
    pillar1Desc: "Every design is individually stitched by local tailors in Dharavi, Mumbai, preserving generational techniques.",
    pillar2Title: "Pure Organic Fabrics",
    pillar2Desc: "We spin organic linen, Mulberry silk, and lightweight khadi cotton for ultimate breathability.",
    pillar3Title: "Bespoke Fitting",
    pillar3Desc: "Tailored personally under Deepak Mahato to match your exact measurements and aesthetic preferences."
  },
  {
    fileName: 'in-hi.html',
    lang: 'hi',
    dir: 'ltr',
    title: 'विष्णुवोग - भारत (हिन्दी)',
    heading: "विष्णुवोग: धारावी का बेहतरीन परिधान",
    body: "मुंबई के समृद्ध हस्तशिल्प और समकालीन वैश्विक डिजाइनों का एक सुंदर मिश्रण, विशेष रूप से तैयार किया गया।",
    cta: "संग्रह का अन्वेषण करें",
    url: "http://localhost:5173/vishnuvogue/in-hi.html",
    aboutTitle: "हमारे निर्माता के बारे में",
    aboutText: "दीपक महतो द्वारा स्थापित, विष्णुवोग धारावी, मुंबई में स्थित है। हम स्थानीय हथकरघा बुनकरों की कलाकृति को प्रदर्शित करने में गर्व महसूस करते हैं जो पीढ़ियों से इस शिल्प को परिपूर्ण कर रहे हैं।",
    kurtas: "डिजाइनर कुर्ते",
    shirts: "प्रीमियम शर्ट्स",
    sarees: "आधुनिक साड़ियां",
    navHome: "मुख्य पृष्ठ",
    navCollection: "संग्रह",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क",
    contactHeader: "संपर्क करें",
    ownerLabel: "मालिक",
    priceText: "अनुरोध पर मूल्य",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    q1: "आप किस सामग्री का उपयोग करते हैं?",
    a1: "हम 100% जैविक कपास, हाथ से काते गए लिनन और स्थानीय भारतीय बुनकरों से प्राप्त शुद्ध रेशम का उपयोग करते हैं।",
    q2: "क्या आप अंतरराष्ट्रीय स्तर पर जहाज भेजते हैं?",
    a2: "हां, हम मुंबई से दुनिया भर में शिप करते हैं। कस्टम और शिपिंग दरें चेकआउट के समय जोड़ी जाती हैं।",
    testimonialTitle: "वैश्विक प्रशंसा",
    t1Text: "“कुर्ते पर कढ़ाई बिल्कुल लुभावनी है। आप हर सिलाई में धारावी की शिल्प कौशल को महसूस कर सकते हैं।”",
    t1Author: "सारा जेन्किंस, फैशन समीक्षक",
    t2Text: "“विष्णुवोग की लिनन शर्ट मेरे गर्मियों की पहली पसंद हैं। हल्का, हवादार और अत्यधिक टिकाऊ।”",
    t2Author: "डेविड मिलर, लंदन डिजाइनर",
    formName: "पूरा नाम",
    formEmail: "ईमेल पता",
    formMsg: "अपनी पसंद के बारे में बताएं...",
    formSubmit: "संदेश भेजें",
    successMsg: "धन्यवाद! दीपक महतो जल्द ही आपसे संपर्क करेंगे।",
    lookbookTitle: "सीज़न लुकबुक",
    lookbookSubtitle: "मुंबई स्ट्रीट फैशन और शाही विरासत की भावना को दर्शाने वाले चुनिंदा संग्रह",
    pillar1Title: "कारीगरी की ईमानदारी",
    pillar1Desc: "हर डिज़ाइन धारावी, मुंबई के स्थानीय दर्जी द्वारा व्यक्तिगत रूप से तैयार किया जाता है।",
    pillar2Title: "शुद्ध जैविक वस्त्र",
    pillar2Desc: "हम बेहतरीन लिनन, मलबरी सिल्क और हल्के खादी कपास का उपयोग करते हैं।",
    pillar3Title: "व्यक्तिगत फिटिंग",
    pillar3Desc: "दीपक महतो के मार्गदर्शन में आपकी सटीक माप और सौंदर्य प्राथमिकताओं के अनुसार अनुकूलित।"
  },
  {
    fileName: 'uk-en.html',
    lang: 'en',
    dir: 'ltr',
    title: 'Vishnuvogue - United Kingdom (English)',
    heading: "Vishnuvogue: London's Dharavi Edit",
    body: "Bespoke artisanal menswear and traditional fabrics direct from Mumbai's creative heart to London.",
    cta: "Discover Edit",
    url: "http://localhost:5173/vishnuvogue/uk-en.html",
    aboutTitle: "The Heritage Brand",
    aboutText: "Established in Dharavi, Mumbai, by Deepak Mahato, we fuse classical Indian stitching methods with British-tailored aesthetics to craft premium shirts.",
    kurtas: "Handloom Kurtas",
    shirts: "Formal Linen Shirts",
    sarees: "Indo-Western Suits",
    navHome: "Home",
    navCollection: "Edit",
    navAbout: "Heritage",
    navContact: "Reach Us",
    contactHeader: "Get In Touch",
    ownerLabel: "Owner",
    priceText: "Price on request",
    faqTitle: "Frequently Asked Questions",
    q1: "What materials do you use?",
    a1: "We use 100% organic cotton, hand-spun linen, and pure Mulberry silk sourced ethically from local Indian weavers.",
    q2: "Do you ship internationally?",
    a2: "Yes, we ship globally from Mumbai. Customs and shipping rates are calculated at checkout.",
    testimonialTitle: "Global Accolades",
    t1Text: "“The embroidery on the Kurta is absolutely breathtaking. You can feel the Dharavi craftsmanship in every stitch.”",
    t1Author: "Sarah Jenkins, NY Fashion Critic",
    t2Text: "“Vishnuvogue's linen shirts are my absolute summer staple. Lightweight, breathable, and highly tailored.”",
    t2Author: "David Miller, London Designer",
    formName: "Full Name",
    formEmail: "Email Address",
    formMsg: "Tell us about your style preference...",
    formSubmit: "Send Message",
    successMsg: "Thank you! Deepak Mahato will contact you shortly.",
    lookbookTitle: "Season Lookbook",
    lookbookSubtitle: "Curated collections capturing the spirit of Mumbai street fashion and royal heritage",
    pillar1Title: "Artisanal Integrity",
    pillar1Desc: "Every design is individually stitched by local tailors in Dharavi, Mumbai, preserving generational techniques.",
    pillar2Title: "Pure Organic Fabrics",
    pillar2Desc: "We spin organic linen, Mulberry silk, and lightweight khadi cotton for ultimate breathability.",
    pillar3Title: "Bespoke Fitting",
    pillar3Desc: "Tailored personally under Deepak Mahato to match your exact measurements and aesthetic preferences."
  },
  {
    fileName: 'fr-fr.html',
    lang: 'fr',
    dir: 'ltr',
    title: 'Vishnuvogue - France (Français)',
    heading: "Vishnuvogue: L'art du textile de Dharavi",
    body: "Des créations haut de gamme alliant le savoir-faire indien ancestral et l'élégance parisienne contemporaine.",
    cta: "Découvrir la mode",
    url: "http://localhost:5173/vishnuvogue/fr-fr.html",
    aboutTitle: "À Propos du Créateur",
    aboutText: "Fondée par Deepak Mahato à Dharavi, Mumbai, Vishnuvogue conçoit des pièces intemporelles issues du travail de nos tisserands locaux de Rajiv Gandhi Nagar.",
    kurtas: "Kurtas sur Mesure",
    shirts: "Chemises en Coton Supérieur",
    sarees: "Prêt-à-porter Moderne",
    navHome: "Accueil",
    navCollection: "Collection",
    navAbout: "À Propos",
    navContact: "Contact",
    contactHeader: "Nous Contacter",
    ownerLabel: "Propriétaire",
    priceText: "Prix sur demande",
    faqTitle: "Questions Fréquentes",
    q1: "Quels matériaux utilisez-vous?",
    a1: "Nous utilisons 100% de coton biologique, du lin tissé à la main et de la soie naturelle provenant de tisseurs indiens éthiques.",
    q2: "LIVREZ-vous à l'international?",
    a2: "Oui, nous livrons dans le monde entier depuis Mumbai. Les tarifs de livraison sont calculés lors du paiement.",
    testimonialTitle: "Recommandations Globales",
    t1Text: "« Les broderies sur le Kurta sont tout simplement époustouflantes. On ressent toute la passion de Dharavi dans chaque fil. »",
    t1Author: "Sarah Jenkins, Critique de Mode à NY",
    t2Text: "« Les chemises en lin de Vishnuvogue sont indispensables pour l'été. Légères, respirantes et très élégantes. »",
    t2Author: "David Miller, Designer à Londres",
    formName: "Nom Complet",
    formEmail: "Adresse E-mail",
    formMsg: "Décrivez vos préférences de style...",
    formSubmit: "Envoyer le Message",
    successMsg: "Merci! Deepak Mahato vous contactera sous peu.",
    lookbookTitle: "Lookbook de Saison",
    lookbookSubtitle: "Des collections exclusives capturant l'esprit du street fashion de Bombay et de l'héritage royal",
    pillar1Title: "Intégrité Artisanale",
    pillar1Desc: "Chaque pièce est cousue individuellement par des tailleurs locaux à Dharavi, Mumbai.",
    pillar2Title: "Matières Biologiques",
    pillar2Desc: "Nous filons le lin biologique, la soie de mûrier et le coton khadi pour un confort optimal.",
    pillar3Title: "Coupe Sur Mesure",
    pillar3Desc: "Conçu sous la direction de Deepak Mahato pour s'adapter à vos mesures exactes."
  },
  {
    fileName: 'de-de.html',
    lang: 'de',
    dir: 'ltr',
    title: 'Vishnuvogue - Germany (Deutsch)',
    heading: "Vishnuvogue: Dharavis Premium Textilien",
    body: "Feinste handgefertigte Hemden und Designer-Kurtas, die indische Tradition und modernen Stil vereinen.",
    cta: "Kollektion ansehen",
    url: "http://localhost:5173/vishnuvogue/de-de.html",
    aboutTitle: "Über den Gründer",
    aboutText: "Gegründet von Deepak Mahato in Dharavi, Mumbai. Vishnuvogue steht für feine Nähkunst und nachhaltige, lokale Handarbeit in Rajiv Gandhi Nagar.",
    kurtas: "Designer Kurtas",
    shirts: "Feine Leinenhemden",
    sarees: "Casual Streetwear",
    navHome: "Startseite",
    navCollection: "Kollektion",
    navAbout: "Über Uns",
    navContact: "Kontakt",
    contactHeader: "Kontaktieren Sie Uns",
    ownerLabel: "Inhaber",
    priceText: "Preis auf Anfrage",
    faqTitle: "Häufig gestellte Fragen",
    q1: "Welche Materialien verwenden Sie?",
    a1: "Wir verwenden 100% Bio-Baumwolle, handgewebtes Leinen und reine Maulbeerseide aus fairem Handel.",
    q2: "Liefern Sie international?",
    a2: "Ja, wir versenden weltweit aus Mumbai. Zoll- und Versandgebühren werden an der Kasse berechnet.",
    testimonialTitle: "Globale Anerkennung",
    t1Text: "„Die Stickereien auf der Kurta sind absolut atemberaubend. Man spürt die Dharavi-Handwerkskunst in jedem Detail.“",
    t1Author: "Sarah Jenkins, NY Modekritikerin",
    t2Text: "„Die Leinenhemden von Vishnuvogue sind mein absoluter Sommer-Klassiker. Leicht, atmungsaktiv und perfekt geschnitten.“",
    t2Author: "David Miller, Designer aus London",
    formName: "Vollständiger Name",
    formEmail: "E-Mail-Adresse",
    formMsg: "Teilen Sie uns Ihre Stilwünsche mit...",
    formSubmit: "Nachricht Senden",
    successMsg: "Vielen Dank! Deepak Mahato wird sich in Kürze mit Ihnen in Verbindung setzen.",
    lookbookTitle: "Saison-Lookbook",
    lookbookSubtitle: "Kurationen, die den Geist der Mumbai Street Fashion und des königlichen Erbes einfangen",
    pillar1Title: "Gründer-Integrität",
    pillar1Desc: "Jedes Design wird von lokalen Schneidern in Dharavi, Mumbai, einzeln genäht.",
    pillar2Title: "Reine Bio-Stoffe",
    pillar2Desc: "Wir verarbeiten Bio-Leinen, Maulbeerseide und leichte Khadi-Baumwolle für optimale Atmungsaktivität.",
    pillar3Title: "Bespoke Schneiderei",
    pillar3Desc: "Individuell angefertigt unter Deepak Mahato, um Ihren genauen Maßen zu entsprechen."
  },
  {
    fileName: 'es-es.html',
    lang: 'es',
    dir: 'ltr',
    title: 'Vishnuvogue - Spain (Español)',
    heading: "Vishnuvogue: Alta Costura de Dharavi",
    body: "Diseños artesanales exclusivos que fusionan el alma de Bombay con la moda urbana europea.",
    cta: "Ver Colección",
    url: "http://localhost:5173/vishnuvogue/es-es.html",
    aboutTitle: "Sobre el Creador",
    aboutText: "Iniciada por Deepak Mahato en el corazón de Dharavi, Bombay. Vishnuvogue lleva la moda india premium a una audiencia global.",
    kurtas: "Kurtas de Diseño",
    shirts: "Camisas Bordadas",
    sarees: "Estilo Urbano Moderno",
    navHome: "Inicio",
    navCollection: "Colección",
    navAbout: "Nosotros",
    navContact: "Contacto",
    contactHeader: "Contáctanos",
    ownerLabel: "Propietario",
    priceText: "Precio bajo petición",
    faqTitle: "Preguntas Frecuentes",
    q1: "¿Qué materiales utilizan?",
    a1: "Utilizamos algodón 100% orgánico, lino hilado a mano y seda natural Mulberry obtenida éticamente.",
    q2: "¿Hacen envíos internacionales?",
    a2: "Sí, enviamos a todo el mundo desde Bombay. Los gastos de envío se calculan en la pantalla de pago.",
    testimonialTitle: "Elogios Globales",
    t1Text: "“El bordado del Kurta es absolutamente impresionante. Se puede sentir la artesanía de Dharavi en cada costura.”",
    t1Author: "Sarah Jenkins, Crítica de Moda de Nueva York",
    t2Text: "“Las camisas de lino de Vishnuvogue son mi prenda básica de verano. Ligeras, transpirables y de gran sastrería.”",
    t2Author: "David Miller, Diseñador de Londres",
    formName: "Nombre Completo",
    formEmail: "Correo Electrónico",
    formMsg: "Cuéntanos sobre tus preferencias de estilo...",
    formSubmit: "Enviar Mensaje",
    successMsg: "¡Gracias! Deepak Mahato se pondrá en contacto contigo pronto.",
    lookbookTitle: "Catálogo de Temporada",
    lookbookSubtitle: "Colecciones selectas que capturan el espíritu de la moda callejera de Bombay y el legado real",
    pillar1Title: "Integridad Artesanal",
    pillar1Desc: "Cada prenda es confeccionada individualmente por sastres locales en Dharavi, Bombay.",
    pillar2Title: "Tejidos Orgánicos",
    pillar2Desc: "Utilizamos lino orgánico, seda de morera y algodón khadi ligero de alta calidad.",
    pillar3Title: "Sastrería Personal",
    pillar3Desc: "Ajustado a sus medidas y gustos estéticos bajo la supervisión de Deepak Mahato."
  },
  {
    fileName: 'it-it.html',
    lang: 'it',
    dir: 'ltr',
    title: 'Vishnuvogue - Italy (Italiano)',
    heading: "Vishnuvogue: Sartoria Dharavi di Lusso",
    body: "Camicie ricamate e abiti tradizionali rifiniti a mano nei laboratori storici di Mumbai.",
    cta: "Esplora il Lusso",
    url: "http://localhost:5173/vishnuvogue/it-it.html",
    aboutTitle: "La Nostra Storia",
    aboutText: "Creata da Deepak Mahato a Dharavi, Mumbai. Uniamo tecniche di filatura indiane e stile sartoriale contemporaneo per dare vita a collezioni iconiche.",
    kurtas: "Kurtas di Seta",
    shirts: "Camicie di Lino Pregiato",
    sarees: "Abbigliamento di Design",
    navHome: "Home",
    navCollection: "Collezione",
    navAbout: "Storia",
    navContact: "Contatti",
    contactHeader: "Contattaci",
    ownerLabel: "Proprietario",
    priceText: "Prezzo su richiesta",
    faqTitle: "Domande Frequenti",
    q1: "Quali materiali utilizzate?",
    a1: "Utilizziamo cotone biologico al 100%, lino filato a mano e pura seta Mulberry da coltivazioni sostenibili.",
    q2: "Effettuate spedizioni internazionali?",
    a2: "Sì, spediamo in tutto il mondo da Mumbai. Le tasse doganali e le tariffe sono visibili al checkout.",
    testimonialTitle: "Critiche Internazionali",
    t1Text: "“Il ricamo sul Kurta è assolutamente mozzafiato. Si percepisce l'artigianato puro di Dharavi in ogni cucitura.”",
    t1Author: "Sarah Jenkins, Critica di Moda NY",
    t2Text: "“Le camicie di lino Vishnuvogue sono il mio capo estivo preferito. Leggere, traspiranti e su misura.”",
    t2Author: "David Miller, Designer di Londra",
    formName: "Nome Completo",
    formEmail: "Indirizzo E-mail",
    formMsg: "Descrivi il tuo stile preferito...",
    formSubmit: "Invia Messaggio",
    successMsg: "Grazie! Deepak Mahato ti contatterà al più presto.",
    lookbookTitle: "Lookbook Stagionale",
    lookbookSubtitle: "Collezioni curate che catturano lo spirito dello stile urbano di Mumbai e dell'eredità reale",
    pillar1Title: "Integrità Artigianale",
    pillar1Desc: "Ogni capo è cucito singolarmente da sarti locali a Dharavi, Mumbai.",
    pillar2Title: "Tessuti Naturali",
    pillar2Desc: "Filati biologici pregiati per garantire freschezza e comfort in qualsiasi stagione.",
    pillar3Title: "Su Misura Personale",
    pillar3Desc: "Adattato alle tue misure reali sotto la cura meticolosa di Deepak Mahato."
  },
  {
    fileName: 'jp-ja.html',
    lang: 'ja',
    dir: 'ltr',
    title: 'ヴィシュヌヴォーグ - 日本 (日本語)',
    heading: "ヴィシュヌヴォーグ：ムンバイの極上布地",
    body: "ダラヴィ地区の伝統的な職人技で作られた、現代的なシルエットを持つ高品質メンズシャツ＆インド服。",
    cta: "コレクションを見る",
    url: "http://localhost:5173/vishnuvogue/jp-ja.html",
    aboutTitle: "創業者について",
    aboutText: "ディーパック・マハトによってムンバイのダラヴィで設立。地元織物職人のこだわりと高品質なテキスタイルを提供します。",
    kurtas: "高級クルタ服",
    shirts: "カスタムシャツ",
    sarees: "モダン・ストリートウェア",
    navHome: "ホーム",
    navCollection: "コレクション",
    navAbout: "ブランドについて",
    navContact: "お問い合わせ",
    contactHeader: "お問い合わせ",
    ownerLabel: "オーナー",
    priceText: "価格はお問い合わせください",
    faqTitle: "よくある質問",
    q1: "どのような生地を使用していますか？",
    a1: "地元のインド人織物職人から倫理的に調達された100％オーガニックコットン、手紡ぎリネン、純粋なマルベリーシルクを使用しています。",
    q2: "日本や海外への発送は可能ですか？",
    a2: "はい、ムンバイから世界中へ発送しています。送料と関税は決済時に計算されます。",
    testimonialTitle: "海外からの評価",
    t1Text: "「クルタの刺繍は本当に息をのむ美しさです。すべてのステッチにダラヴィの職人魂が宿っています。」",
    t1Author: "サラ・ジェンキンス（NYファッション批評家）",
    t2Text: "「ヴィシュヌヴォーグのリネンシャツは私の夏の定番。軽くて通気性が良く、見事な仕立てです。」",
    t2Author: "デビッド・ミラー（ロンドン・デザイナー）",
    formName: "お名前（フルネーム）",
    formEmail: "メールアドレス",
    formMsg: "ご希望のスタイルやご質問をどうぞ...",
    formSubmit: "送信する",
    successMsg: "ありがとうございます！ディーパック・マハトより折り返しご連絡いたします。",
    lookbookTitle: "シーズン・ルックブック",
    lookbookSubtitle: "ムンバイのストリートファッションと伝統の調和を追求したコレクション",
    pillar1Title: "職人の誇り",
    pillar1Desc: "すべてのデザインは、ムンバイのダラヴィ現地で職人が手縫いで仕上げています。",
    pillar2Title: "オーガニック生地",
    pillar2Desc: "オーガニックリネン、マルベリーシルク、手織りカディ綿による抜群の通気性。",
    pillar3Title: "ビスポーク対応",
    pillar3Desc: "ディーパック・マハト監修のもと、お客様一人一人の採寸に合わせて丁寧に仕立てます。"
  },
  {
    fileName: 'ae-ar.html',
    lang: 'ar',
    dir: 'rtl',
    title: 'فيشنوفوغ - الإمارات (العربية)',
    heading: "فيشنوفوغ: أقمشة دهراري الفاخرة",
    body: "قمصان مصممة يدوياً وبدلات كورتا أنيقة تجمع بين التراث الهندي العريق والذوق العربي الرفيع.",
    cta: "تسوق التشكيلة",
    url: "http://localhost:5173/vishnuvogue/ae-ar.html",
    aboutTitle: "عن العلامة التجارية",
    aboutText: "أسسها ديباك ماهاتو في دهراري بمومباي. نفخر بتقديم أجود الأزياء المطرزة يدوياً لدعم الحرفيين المحليين في مخيم الترانزيت.",
    kurtas: "كورتا مطرزة",
    shirts: "قمصان كتان ممتازة",
    sarees: "أزياء هندية عصرية",
    navHome: "الرئيسية",
    navCollection: "التشكيلة",
    navAbout: "عن الشركة",
    navContact: "اتصل بنا",
    contactHeader: "تواصل معنا",
    ownerLabel: "المالك",
    priceText: "السعر عند الطلب",
    faqTitle: "الأسئلة الشائعة",
    q1: "ما هي المواد التي تستخدمونها؟",
    a1: "نحن نستخدم القطن العضوي 100٪، والكتان المغزول يدويًا، والحرير الطبيعي الفاخر الذي يتم الحصول عليه بشكل أخلاقي.",
    q2: "هل تشحنون دولياً؟",
    a2: "نعم، نحن نشحن عالمياً من مومباي. يتم حساب تكاليف الشحن والجمارك عند الدفع.",
    testimonialTitle: "أصداء عالمية",
    t1Text: "«التطريز على بدلة الكورتا مذهل وخلاب للغاية. يمكنك الشعور بالحرفية اليدوية في كل غرزة.»",
    t1Author: "سارة جينكينز، ناقدة الموضة في نيويورك",
    t2Text: "«قمصان الكتان من فيشنوفوغ هي خياري المفضل دائماً للصيف. خفيفة ومريحة ومفصلة بشكل مثالي.»",
    t2Author: "ديفيد ميلر، مصمم أزياء في لندن",
    formName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    formMsg: "أخبرنا عن تفضيلاتك في التصميم...",
    formSubmit: "إرسال الرسالة",
    successMsg: "شكراً لك! سيتواصل معك ديباك ماهاتو قريباً جداً.",
    lookbookTitle: "كتالوج الموسم",
    lookbookSubtitle: "تشكيلات حصرية تلتقط روح الموضة العصرية في مومباي والتراث الملكي العريق",
    pillar1Title: "أصالة الحرفة اليدوية",
    pillar1Desc: "كل تصميم يتم حياكته وتفصيله يدوياً بواسطة خياطين محليين في دهراري، مومباي.",
    pillar2Title: "أقمشة عضوية خالصة",
    pillar2Desc: "نستخدم الكتان العضوي الفاخر، وحرير التوت، والقطن الخفيف لضمان التهوية والراحة.",
    pillar3Title: "تفصيل شخصي خاص",
    pillar3Desc: "يتم تفصيله خصيصاً بإشراف ديباك ماهاتو ليلائم مقاساتك وتفضيلاتك الجمالية تماماً."
  },
  {
    fileName: 'au-en.html',
    lang: 'en',
    dir: 'ltr',
    title: 'Vishnuvogue - Australia (English)',
    heading: "Vishnuvogue: Heritage Couture of Mumbai",
    body: "Lightweight linen, organic cotton, and embroidered shirts curated by Deepak Mahato for Australian summers.",
    cta: "Browse Collection",
    url: "http://localhost:5173/vishnuvogue/au-en.html",
    aboutTitle: "Dharavi Artisans",
    aboutText: "Curated by Deepak Mahato, Vishnuvogue provides ethically sourced, beautifully crafted clothing items to clients worldwide, preserving local craft heritage.",
    kurtas: "Cotton Kurtas",
    shirts: "Artisanal Linen Shirts",
    sarees: "Streetwear Cuts",
    navHome: "Home",
    navCollection: "Shop",
    navAbout: "Artisans",
    navContact: "Contact Us",
    contactHeader: "Get In Touch",
    ownerLabel: "Owner",
    priceText: "Price on request",
    faqTitle: "Frequently Asked Questions",
    q1: "What materials do you use?",
    a1: "We use 100% organic cotton, hand-spun linen, and pure Mulberry silk sourced ethically from local Indian weavers.",
    q2: "Do you ship internationally?",
    a2: "Yes, we ship globally from Mumbai. Customs and shipping rates are calculated at checkout.",
    testimonialTitle: "Global Accolades",
    t1Text: "“The embroidery on the Kurta is absolutely breathtaking. You can feel the Dharavi craftsmanship in every stitch.”",
    t1Author: "Sarah Jenkins, NY Fashion Critic",
    t2Text: "“Vishnuvogue's linen shirts are my absolute summer staple. Lightweight, breathable, and highly tailored.”",
    t2Author: "David Miller, London Designer",
    formName: "Full Name",
    formEmail: "Email Address",
    formMsg: "Tell us about your style preference...",
    formSubmit: "Send Message",
    successMsg: "Thank you! Deepak Mahato will contact you shortly.",
    lookbookTitle: "Season Lookbook",
    lookbookSubtitle: "Curated collections capturing the spirit of Mumbai street fashion and royal heritage",
    pillar1Title: "Artisanal Integrity",
    pillar1Desc: "Every design is individually stitched by local tailors in Dharavi, Mumbai, preserving generational techniques.",
    pillar2Title: "Pure Organic Fabrics",
    pillar2Desc: "We spin organic linen, Mulberry silk, and lightweight khadi cotton for ultimate breathability.",
    pillar3Title: "Bespoke Fitting",
    pillar3Desc: "Tailored personally under Deepak Mahato to match your exact measurements and aesthetic preferences."
  }
];

// Base HTML template generating detailed working design
const getTemplate = (p) => `<!DOCTYPE html>
<html lang="${p.lang}" dir="${p.dir}" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .vogue-font { font-family: 'Playfair Display', serif; }
    .fade-in { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hero-glow {
      box-shadow: inset 0 0 100px rgba(0,0,0,0.8);
    }
  </style>
</head>
<body class="bg-[#07090e] text-gray-200 min-h-screen flex flex-col selection:bg-amber-500/30 selection:text-white">

  <!-- Header -->
  <header class="sticky top-0 z-50 bg-[#090b11]/85 backdrop-blur-md border-b border-gray-900 transition-all duration-355 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <a href="#" class="flex items-center gap-2 group">
        <span class="text-xl md:text-2xl font-extrabold tracking-widest uppercase text-amber-500 vogue-font transition-all duration-300 group-hover:text-amber-400">Vishnuvogue</span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-gray-400">
        <a href="#" class="hover:text-amber-500 transition-all duration-200">${p.navHome}</a>
        <a href="#collection" class="hover:text-amber-500 transition-all duration-200">${p.navCollection}</a>
        <a href="#pillars" class="hover:text-amber-500 transition-all duration-200">Pillars</a>
        <a href="#about" class="hover:text-amber-500 transition-all duration-200">${p.navAbout}</a>
        <a href="#faq" class="hover:text-amber-500 transition-all duration-200">FAQ</a>
        <a href="#contact" class="hover:text-amber-500 transition-all duration-200">${p.navContact}</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section with Custom Background Image Overlay -->
  <section class="relative h-[85vh] bg-cover bg-center flex flex-col items-center justify-center text-center px-6 overflow-hidden hero-glow border-b border-gray-950" style="background-image: url('hero.png');">
    <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#07090e]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)]"></div>
    
    <div class="max-w-3xl relative z-10 fade-in">
      <span class="text-xs uppercase tracking-widest text-amber-500 font-bold bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">Mumbai Haute Couture</span>
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-white mt-6 mb-6 leading-tight select-none">${p.heading}</h1>
      <p class="text-gray-300 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed opacity-90">${p.body}</p>
      <div>
        <a 
          href="${p.url}" 
          class="inline-flex items-center justify-center px-8 py-4 border border-amber-500 bg-amber-500 text-black hover:bg-transparent hover:text-amber-500 font-bold rounded text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/10 hover:scale-[1.03] hover:shadow-amber-500/20"
        >
          ${p.cta}
        </a>
      </div>
    </div>
  </section>

  <!-- Brand Pillars (Cool new values section) -->
  <section id="pillars" class="py-24 px-6 max-w-7xl mx-auto w-full border-b border-gray-950">
    <div class="text-center mb-16">
      <span class="text-xs text-amber-500 uppercase tracking-widest font-bold font-mono">Our Craft Pillars</span>
      <h2 class="text-3xl md:text-4xl font-bold text-white tracking-wide mt-2">Built On Pure Traditions</h2>
      <div class="h-1 w-12 bg-amber-500 mx-auto mt-4 rounded"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Pillar 1 -->
      <div class="bg-[#0b101c]/40 border border-gray-900/60 p-8 rounded-2xl hover:border-amber-500/20 transition-all duration-300">
        <span class="text-3xl block mb-4">🪡</span>
        <h3 class="text-white font-bold text-lg mb-3">${p.pillar1Title}</h3>
        <p class="text-xs text-gray-400 leading-relaxed">${p.pillar1Desc}</p>
      </div>
      <!-- Pillar 2 -->
      <div class="bg-[#0b101c]/40 border border-gray-900/60 p-8 rounded-2xl hover:border-amber-500/20 transition-all duration-300">
        <span class="text-3xl block mb-4">🌿</span>
        <h3 class="text-white font-bold text-lg mb-3">${p.pillar2Title}</h3>
        <p class="text-xs text-gray-400 leading-relaxed">${p.pillar2Desc}</p>
      </div>
      <!-- Pillar 3 -->
      <div class="bg-[#0b101c]/40 border border-gray-900/60 p-8 rounded-2xl hover:border-amber-500/20 transition-all duration-300">
        <span class="text-3xl block mb-4">✂️</span>
        <h3 class="text-white font-bold text-lg mb-3">${p.pillar3Title}</h3>
        <p class="text-xs text-gray-400 leading-relaxed">${p.pillar3Desc}</p>
      </div>
    </div>
  </section>

  <!-- Collection Showcase -->
  <section id="collection" class="py-24 px-6 max-w-7xl mx-auto w-full">
    <div class="text-center mb-16">
      <span class="text-xs text-amber-500 uppercase tracking-widest font-bold font-mono">${p.lookbookTitle}</span>
      <h2 class="text-3xl md:text-4xl font-bold text-white tracking-wide mt-2">${p.lookbookSubtitle}</h2>
      <div class="h-1 w-12 bg-amber-500 mx-auto mt-4 rounded"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- Item 1 -->
      <div class="bg-[#0e121f] border border-gray-900 rounded-xl overflow-hidden group hover:border-amber-500/30 transition-all duration-300 shadow-2xl flex flex-col hover:-translate-y-1">
        <div class="h-[340px] bg-slate-950 overflow-hidden relative">
          <img src="kurta.png" alt="${p.kurtas}" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#07090e]/95 via-transparent to-transparent"></div>
          <span class="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-amber-500 bg-[#07090e]/85 px-3 py-1 rounded border border-gray-800">${p.priceText}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-white font-semibold text-lg mb-2 vogue-font">${p.kurtas}</h3>
            <p class="text-xs text-gray-400 leading-relaxed">Pure handloom cotton Kurtas featuring delicate golden embroidery and organic details, custom made for formal wear.</p>
          </div>
          <a href="#contact" class="mt-5 text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Inquire Now →</a>
        </div>
      </div>

      <!-- Item 2 -->
      <div class="bg-[#0e121f] border border-gray-900 rounded-xl overflow-hidden group hover:border-amber-500/30 transition-all duration-300 shadow-2xl flex flex-col hover:-translate-y-1">
        <div class="h-[340px] bg-slate-950 overflow-hidden relative">
          <img src="shirt.png" alt="${p.shirts}" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#07090e]/95 via-transparent to-transparent"></div>
          <span class="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-amber-500 bg-[#07090e]/85 px-3 py-1 rounded border border-gray-800">${p.priceText}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-white font-semibold text-lg mb-2 vogue-font">${p.shirts}</h3>
            <p class="text-xs text-gray-400 leading-relaxed">Luxury hand-spun summer linen shirts with micro-tailoring. Highly breathable, elegant cuts perfect for global summers.</p>
          </div>
          <a href="#contact" class="mt-5 text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Inquire Now →</a>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="bg-[#0e121f] border border-gray-900 rounded-xl overflow-hidden group hover:border-amber-500/30 transition-all duration-300 shadow-2xl flex flex-col hover:-translate-y-1">
        <div class="h-[340px] bg-slate-950 overflow-hidden relative">
          <img src="streetwear.png" alt="${p.sarees}" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#07090e]/95 via-transparent to-transparent"></div>
          <span class="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-amber-500 bg-[#07090e]/85 px-3 py-1 rounded border border-gray-800">${p.priceText}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-white font-semibold text-lg mb-2 vogue-font">${p.sarees}</h3>
            <p class="text-xs text-gray-400 leading-relaxed">Contemporary fusion jackets combining raw Indian handloom textiles and streetwear contours for a bold statement.</p>
          </div>
          <a href="#contact" class="mt-5 text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Inquire Now →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="bg-[#090b11] py-24 px-6 border-y border-gray-950">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <span class="text-xs text-amber-500 uppercase tracking-widest font-bold font-mono">Dharavi Creative Hub</span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 mt-2 leading-tight">${p.aboutTitle}</h2>
        <div class="h-1 w-12 bg-amber-500 mb-6 rounded"></div>
        <p class="text-gray-450 text-sm leading-relaxed mb-4 opacity-90">${p.aboutText}</p>
        <p class="text-gray-300 text-sm leading-relaxed font-semibold">
          <span class="text-slate-500">${p.ownerLabel}:</span> Deepak Mahato
        </p>
      </div>
      <div class="relative bg-[#0b0e17] p-8 border border-gray-900 rounded-2xl flex flex-col justify-center h-64 text-center shadow-lg">
        <div class="text-amber-500/5 font-outfit font-extrabold text-9xl select-none absolute top-4 left-4">VV</div>
        <p class="italic text-sm text-gray-300 relative z-10 leading-relaxed font-outfit">
          "Our brand Vishnuvogue thrives in Dharavi. We weave dreams, tradition, and global fashion into every single thread."
        </p>
        <span class="text-xs text-amber-500 mt-6 block font-bold relative z-10">- Deepak Mahato</span>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-24 px-6 max-w-7xl mx-auto w-full border-b border-gray-950">
    <div class="text-center mb-16">
      <span class="text-xs text-amber-500 uppercase tracking-widest font-bold font-mono">${p.testimonialTitle}</span>
      <h2 class="text-3xl font-bold text-white mt-2">Word of Mouth</h2>
      <div class="h-1 w-12 bg-amber-500 mx-auto mt-4 rounded"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div class="p-6 rounded-xl border border-gray-900 bg-[#0c101c]/50 shadow-md">
        <p class="text-xs text-slate-300 italic leading-relaxed">${p.t1Text}</p>
        <span class="block text-[11px] font-bold text-amber-500 mt-4">${p.t1Author}</span>
      </div>
      <div class="p-6 rounded-xl border border-gray-900 bg-[#0c101c]/50 shadow-md">
        <p class="text-xs text-slate-300 italic leading-relaxed">${p.t2Text}</p>
        <span class="block text-[11px] font-bold text-amber-500 mt-4">${p.t2Author}</span>
      </div>
    </div>
  </section>

  <!-- Accordion FAQ Section -->
  <section id="faq" class="bg-[#090b11] py-24 px-6">
    <div class="max-w-3xl mx-auto w-full">
      <div class="text-center mb-12">
        <span class="text-xs text-amber-500 uppercase tracking-widest font-bold font-mono">Inquiries</span>
        <h2 class="text-3xl font-bold text-white mt-2">${p.faqTitle}</h2>
        <div class="h-1 w-12 bg-amber-500 mx-auto mt-4 rounded"></div>
      </div>
      
      <div class="flex flex-col gap-4">
        <details class="group bg-[#0b101c]/60 border border-gray-900 rounded-xl p-5 transition-all hover:border-amber-500/25">
          <summary class="font-semibold text-sm text-white cursor-pointer flex justify-between items-center select-none">
            <span>${p.q1}</span>
            <span class="text-amber-500 transition-transform duration-300 group-open:rotate-180">↓</span>
          </summary>
          <p class="mt-3 text-xs text-gray-450 leading-relaxed pt-2 border-t border-gray-900">${p.a1}</p>
        </details>

        <details class="group bg-[#0b101c]/60 border border-gray-900 rounded-xl p-5 transition-all hover:border-amber-500/25">
          <summary class="font-semibold text-sm text-white cursor-pointer flex justify-between items-center select-none">
            <span>${p.q2}</span>
            <span class="text-amber-500 transition-transform duration-300 group-open:rotate-180">↓</span>
          </summary>
          <p class="mt-3 text-xs text-gray-450 leading-relaxed pt-2 border-t border-gray-900">${p.a2}</p>
        </details>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-24 px-6 max-w-7xl mx-auto w-full border-t border-gray-950">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <span class="text-xs uppercase tracking-widest text-amber-500 font-bold">${p.navContact}</span>
        <h2 class="text-3xl font-bold text-white mt-2 mb-4">${p.contactHeader}</h2>
        <p class="text-gray-400 text-xs max-w-md leading-relaxed mb-8">
          Have inquiries regarding custom sizing, designer Kurta tailoring, or wholesale exports? Drop us a line.
        </p>
        
        <div class="flex flex-col gap-5 text-sm">
          <div class="flex items-start gap-4">
            <span class="text-amber-500 font-bold text-lg">📍</span>
            <div>
              <h4 class="text-xs text-slate-500 font-bold uppercase tracking-wider">Atelier Address</h4>
              <p class="text-gray-300 mt-1 text-xs leading-relaxed max-w-xs">
                Shop number 9 block number 11 transit camp rajiv gandhi nagar dharavi mumbai -400017
              </p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <span class="text-amber-500 font-bold text-lg">📞</span>
            <div>
              <h4 class="text-xs text-slate-500 font-bold uppercase tracking-wider">Contact Number</h4>
              <a href="tel:8591328441" class="text-gray-300 mt-1 inline-block hover:text-amber-500 transition-colors text-xs font-semibold">8591328441</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Contact Form -->
      <div class="bg-[#0b101c]/30 border border-gray-900 p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <form id="contactForm" onsubmit="handleFormSubmit(event)" class="flex flex-col gap-4">
          <div>
            <label class="text-[10px] uppercase tracking-wider text-slate-550 font-bold block mb-1.5">${p.formName}</label>
            <input required type="text" class="w-full bg-[#06080d] border border-gray-800 rounded px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50 transition-colors" />
          </div>
          <div>
            <label class="text-[10px] uppercase tracking-wider text-slate-550 font-bold block mb-1.5">${p.formEmail}</label>
            <input required type="email" class="w-full bg-[#06080d] border border-gray-800 rounded px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50 transition-colors" />
          </div>
          <div>
            <label class="text-[10px] uppercase tracking-wider text-slate-550 font-bold block mb-1.5">${p.formMsg}</label>
            <textarea required rows="4" class="w-full bg-[#06080d] border border-gray-800 rounded px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50 transition-colors resize-none"></textarea>
          </div>
          <button 
            type="submit" 
            class="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded text-xs uppercase tracking-wider transition-colors hover:scale-[1.01]"
          >
            ${p.formSubmit}
          </button>
        </form>

        <!-- Mock Success Modal overlay with smooth transition -->
        <div id="successModal" class="absolute inset-0 bg-[#090b11] flex flex-col items-center justify-center text-center p-6 translate-x-full transition-transform duration-500 ease-in-out">
          <div class="p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 class="text-white font-bold text-base mb-2">Message Dispatched</h4>
          <p class="text-xs text-gray-400 max-w-xs leading-relaxed mb-6">${p.successMsg}</p>
          <button 
            type="button"
            onClick="closeModal()" 
            class="px-5 py-2 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-350 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-gray-900 bg-[#05060a] py-8 text-center text-[10px] text-gray-500 mt-auto">
    <p>© 2026 Vishnuvogue. Curated under the supervision of Deepak Mahato. All rights reserved.</p>
  </footer>

  <!-- Mock script to simulate dynamic interactions -->
  <script>
    function handleFormSubmit(e) {
      e.preventDefault();
      const modal = document.getElementById('successModal');
      modal.classList.remove('translate-x-full');
      modal.classList.add('translate-x-0');
      document.getElementById('contactForm').reset();
    }
    
    function closeModal() {
      const modal = document.getElementById('successModal');
      modal.classList.remove('translate-x-0');
      modal.classList.add('translate-x-full');
    }
  </script>

</body>
</html>
`;

pages.forEach(p => {
  const filePath = path.join(dir, p.fileName);
  fs.writeFileSync(filePath, getTemplate(p), 'utf8');
});

console.log('Successfully generated complete detailed localized pages with hero background and brand pillars!');
