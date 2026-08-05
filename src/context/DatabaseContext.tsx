import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, RFQItem, SupplierApplication, CertificationItem, ArticleItem } from '../types';

interface DatabaseContextType {
  products: Product[];
  rfqs: RFQItem[];
  suppliers: SupplierApplication[];
  certifications: CertificationItem[];
  articles: ArticleItem[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  addRFQ: (rfq: RFQItem) => void;
  updateRFQStatus: (id: string, status: RFQItem['status']) => void;
  addSupplierApplication: (supplier: Omit<SupplierApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateSupplierStatus: (id: string, status: SupplierApplication['status']) => void;
}

const mockProducts: Product[] = [
  // 1. STAPLE FOOD PRODUCTS
  {
    id: 'staple-1',
    name: 'Ghanaian Premium Pona Yam Tubers',
    category: 'Staple Food Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Northern & Bono East Regions)',
    status: 'PUBLISHED',
    description: 'Grade-A export quality white Pona yams. Firm texture, high dry-matter content, sweet aroma, carefully washed, sanitized, and paper-wrapped for long transit export shipping.',
    moq: '5 Metric Tons (20ft FCL)',
    shelfLife: '3 Months (Ventilated container)',
    storageConditions: 'Dry, well-ventilated ambient temperature (12-15°C).',
    packagingOptions: ['25kg Wooden Crates', '20kg Cardboard Cartons', 'Custom Palletized Boxes'],
    certifications: ['Phytosanitary Certificate', 'FDA Ghana Export Clearance', 'GEPA Verified'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/hero-yam-tubers.jpg',
    featured: true
  },
  {
    id: 'staple-2',
    name: 'Export-Grade Fresh Green Plantain',
    category: 'Staple Food Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Ashanti & Western Regions)',
    status: 'PUBLISHED',
    description: 'Unripened green plantains harvested at optimal maturity. Firm fingers, vibrant color, high nutrient density for cooking, frying, or plantain flour production.',
    moq: '3 Metric Tons',
    shelfLife: '4-6 Weeks (Reefer container at 13°C)',
    storageConditions: 'Temperature controlled reefer storage (13°C).',
    packagingOptions: ['18kg Telescopic Export Cartons', '20kg Plastic Crates'],
    certifications: ['Phytosanitary Certificate', 'FDA Ghana Registered'],
    targetMarkets: ['Europe', 'North America', 'ECOWAS'],
    imageUrl: '/images/Green plantain.jpg',
    featured: true
  },
  {
    id: 'staple-3',
    name: 'Ghanaian Local Perfumed & White Rice',
    category: 'Staple Food Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Volta & Northern Regions)',
    status: 'PUBLISHED',
    description: 'Naturally aromatic whole grain Ghanaian paddy rice. Double polished, stone-free, low broken grain percentage (<5%), rich in nutrients and distinct local flavor.',
    moq: '10 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Store in cool dry warehouse on wooden pallets.',
    packagingOptions: ['50kg Woven PP Sacks', '25kg Woven Bags', '5kg Retail Pouches'],
    certifications: ['FDA Ghana Certified', 'MoFA Quality Inspected'],
    targetMarkets: ['ECOWAS Region', 'West Africa', 'Domestic Bulk'],
    imageUrl: '/images/hero-white-maize.jpg',
    featured: false
  },
  {
    id: 'staple-4',
    name: 'Yellow & White Maize (Corn)',
    category: 'Staple Food Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Ashanti & Bono Regions)',
    status: 'PUBLISHED',
    description: 'Cleaned, de-stoned, non-GMO yellow and white maize grains. Moisture content controlled (<13%), tested clear of aflatoxins, suitable for human consumption and animal feed milling.',
    moq: '15 Metric Tons',
    shelfLife: '18 Months',
    storageConditions: 'Fumigated, moisture-controlled grain silo or warehouse.',
    packagingOptions: ['50kg Jute Sacks', '50kg Woven PP Bags', '1 Metric Ton Jumbo Totes'],
    certifications: ['Phytosanitary Certificate', 'Aflatoxin Assay Certificate (<4ppb)'],
    targetMarkets: ['West Africa', 'Middle East', 'Europe'],
    imageUrl: '/images/hero-white-maize.jpg',
    featured: false
  },

  // 2. PROCESSED CASSAVA PRODUCTS
  {
    id: 'cassava-1',
    name: 'High Quality Cassava Flour (HQCF)',
    category: 'Processed Cassava Products',
    type: 'Processed Product',
    origin: 'Ghana (Eastern Region Processing Plant)',
    status: 'PUBLISHED',
    description: '100% pure unfermented cassava flour. White, odorless, fine particle size, gluten-free direct substitute for wheat flour in commercial bakery, biscuits, and industrial paper adhesive.',
    moq: '5 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Cool dry warehouse, sealed from ambient moisture.',
    packagingOptions: ['25kg Kraft Paper Bags', '50kg Woven PP Sacks', '1 Metric Ton Jumbo Bags'],
    certifications: ['FDA Ghana Certified', 'Phytosanitary Certificate', 'SGS Quality Inspected'],
    targetMarkets: ['Europe', 'North America', 'West Africa'],
    imageUrl: '/images/hero-flours-starches.jpg',
    featured: true
  },
  {
    id: 'cassava-2',
    name: 'Export-Grade Roasted Fine Gari (Yellow & White)',
    category: 'Processed Cassava Products',
    type: 'Processed Product',
    origin: 'Ghana (Volta & Eastern Regions)',
    status: 'PUBLISHED',
    description: 'Crisp, sieved, double-roasted fermented cassava granules. Produced under strict hygienic conditions. Available in traditional White and Palm-oil enriched Yellow Gari.',
    moq: '2 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Sealed moisture-barrier packaging in ambient storage.',
    packagingOptions: ['20kg Multi-wall Paper Bags', '1kg Zip-lock Pouches', '500g Jar Containers'],
    certifications: ['FDA Ghana Registered', 'HACCP Standard Certified'],
    targetMarkets: ['North America', 'Europe', 'ECOWAS'],
    imageUrl: '/images/hero-cassava-roots.jpg',
    featured: true
  },
  {
    id: 'cassava-3',
    name: 'Industrial & Food-Grade Cassava Starch',
    category: 'Processed Cassava Products',
    type: 'Processed Product',
    origin: 'Ghana (Greater Accra Processing Hub)',
    status: 'PUBLISHED',
    description: 'Refined native cassava starch with high peak viscosity, high clarity, and low gelatinization temperature. Ideal for food thickening, confectionery, textiles, and paper manufacturing.',
    moq: '10 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Palletized dry warehouse storage.',
    packagingOptions: ['25kg Multi-wall Paper Sacks', '850kg Big Bags'],
    certifications: ['FDA Ghana Registered', 'ISO 22000 Food Safety'],
    targetMarkets: ['West Africa', 'Europe', 'Asia'],
    imageUrl: '/images/agro-processing-factory.jpg',
    featured: false
  },

  // 3. GRAINS, BEANS & LEGUMES
  {
    id: 'legume-1',
    name: 'Ghana Black-Eyed Cowpeas (Beans)',
    category: 'Grains, Beans & Legumes',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Northern & Savanna Regions)',
    status: 'PUBLISHED',
    description: 'Hand-picked, machine-cleaned black-eyed cowpeas. Uniform grain size, low moisture (<12%), free from live insects or chemical residues, high protein content.',
    moq: '5 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Pest-controlled dry grain storage.',
    packagingOptions: ['50kg Woven PP Sacks', '25kg Kraft Bags'],
    certifications: ['Phytosanitary Certificate', 'Quality Assay Report'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/Cowpeas.jpg',
    featured: true
  },
  {
    id: 'legume-2',
    name: 'Raw & Processed Soybeans',
    category: 'Grains, Beans & Legumes',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Northern Region)',
    status: 'PUBLISHED',
    description: 'Non-GMO golden soybeans rich in oil (20%) and protein (40%). Screened and graded for soy oil extraction, soy milk, tofu manufacturing, and animal feed formulation.',
    moq: '10 Metric Tons',
    shelfLife: '18 Months',
    storageConditions: 'Dry, ventilated grain warehouse.',
    packagingOptions: ['50kg Jute Sacks', '1 Metric Ton Jumbo Bags'],
    certifications: ['Non-GMO Certificate', 'Phytosanitary Certificate'],
    targetMarkets: ['Asia', 'Europe', 'ECOWAS'],
    imageUrl: '/images/Soybeans.jpg',
    featured: true
  },

  // 4. SPICES & SEASONINGS
  {
    id: 'spice-1',
    name: 'Sun-Dried Ginger (Whole & Split)',
    category: 'Spices & Seasonings',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Volta & Eastern Regions)',
    status: 'PUBLISHED',
    description: 'Pungent Ghanaian dried ginger with high essential oleoresin content. Thoroughly washed, split or whole solar-dried for essential oil extraction and spice blending.',
    moq: '2 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Dry, pest-controlled ambient storage.',
    packagingOptions: ['25kg Polypropylene Bags', '40kg Jute Bags'],
    certifications: ['Phytosanitary Certificate', 'Lab CoA Included'],
    targetMarkets: ['Middle East', 'Europe', 'North America'],
    imageUrl: '/images/hero-ghana-spices.jpg',
    featured: true
  },
  {
    id: 'spice-2',
    name: 'Prekese (Aidan Fruit Pods)',
    category: 'Spices & Seasonings',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Forest Regions)',
    status: 'PUBLISHED',
    description: 'Whole dried Tetrapleura tetraptera pods (Prekese). Highly aromatic natural spice, widely valued in traditional soups, herbal beverages, and natural wellness formulations.',
    moq: '500 kg',
    shelfLife: '24 Months',
    storageConditions: 'Cool dry place, sealed against humidity.',
    packagingOptions: ['15kg Mesh Sacks', '1kg Sealed Bags'],
    certifications: ['FDA Ghana Registered', 'Phytosanitary Clearance'],
    targetMarkets: ['North America', 'Europe', 'Global Diaspora'],
    imageUrl: '/images/hero-ghana-spices.jpg',
    featured: true
  },
  {
    id: 'spice-3',
    name: 'Grains of Selim / Hwentia (African Pepper)',
    category: 'Spices & Seasonings',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Eastern Forest Belt)',
    status: 'PUBLISHED',
    description: 'Dried pods of Xylopia aethiopica (Hwentia). Musky, spicy flavor profile used in soup seasonings, mulled herbal drinks, and natural food preservation.',
    moq: '500 kg',
    shelfLife: '24 Months',
    storageConditions: 'Moisture-proof sealed bags.',
    packagingOptions: ['25kg PP Bags', '500g Pouches'],
    certifications: ['Phytosanitary Certificate', 'Lab Purity Assay'],
    targetMarkets: ['Europe', 'North America', 'West Africa'],
    imageUrl: '/images/hero-ghana-spices.jpg',
    featured: false
  },

  // 5. COCOA & COFFEE PRODUCTS
  {
    id: 'cocoa-1',
    name: 'Raw Ghanaian Export Cocoa Beans (Main Crop)',
    category: 'Cocoa & Coffee Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Western North & Ashanti Regions)',
    status: 'PUBLISHED',
    description: 'World-renowned premium Ghanaian cocoa beans. Fully fermented, sun-dried, slate-free bean count, rich fat content (>52%). Sourced from COCOBOD verified cooperatives.',
    moq: '12.5 Metric Tons (20ft FCL)',
    shelfLife: '24 Months',
    storageConditions: 'Clean, dry warehouse, jute sack storage.',
    packagingOptions: ['64.5kg Export Quality Jute Bags'],
    certifications: ['COCOBOD Quality Inspection Certificate', 'Phytosanitary Certificate', 'Rainforest Alliance Option'],
    targetMarkets: ['Europe', 'North America', 'Asia'],
    imageUrl: '/images/cocoa-coffee.jpg',
    featured: true
  },
  {
    id: 'cocoa-2',
    name: 'Pure Natural & Alkalized Cocoa Butter',
    category: 'Cocoa & Coffee Products',
    type: 'Processed Product',
    origin: 'Ghana (Cocoa Processing Plant, Tema)',
    status: 'PUBLISHED',
    description: 'Deodorized and prime pure press cocoa butter extracted from select Ghanaian cocoa beans. Rich golden hue, smooth melting profile for chocolate and cosmetics.',
    moq: '1 Metric Ton',
    shelfLife: '24 Months',
    storageConditions: 'Cool dry area below 20°C.',
    packagingOptions: ['25kg Corrugated Cartons with Polyethylene Liner'],
    certifications: ['FDA Ghana Certified', 'HACCP & ISO 22000'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/cocoa-coffee.jpg',
    featured: true
  },
  {
    id: 'cocoa-3',
    name: 'Shade-Grown Ghanaian Robusta Coffee Beans',
    category: 'Cocoa & Coffee Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Western Region)',
    status: 'PUBLISHED',
    description: 'Sun-dried green coffee beans grown under tropical rainforest canopy. Full body, low acidity, earthy chocolate notes ideal for commercial espresso roasters.',
    moq: '2 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Dry, well-ventilated jute bag storage.',
    packagingOptions: ['60kg GrainPro Jute Sacks'],
    certifications: ['Phytosanitary Certificate', 'Origin Traceability Cert'],
    targetMarkets: ['Europe', 'North America'],
    imageUrl: '/images/cocoa-coffee.jpg',
    featured: false
  },

  // 6. FRUITS & VEGETABLES
  {
    id: 'fruit-1',
    name: 'Fresh Smooth Cayenne Pineapples',
    category: 'Fruits & Vegetables',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Eastern & Central Regions)',
    status: 'PUBLISHED',
    description: 'Air-freight and sea-freight export grade fresh pineapples. High Brix sugar content (>13°), vibrant crown, uniform calibration, harvested to order.',
    moq: '2 Metric Tons',
    shelfLife: '3-4 Weeks (Reefer container at 8°C)',
    storageConditions: 'Refrigerated transit (8°C - 10°C).',
    packagingOptions: ['12kg Telescopic Cartons'],
    certifications: ['GlobalG.A.P. Certified', 'Phytosanitary Certificate'],
    targetMarkets: ['Europe', 'Middle East'],
    imageUrl: '/images/fruits-vegetables.jpg',
    featured: true
  },
  {
    id: 'fruit-2',
    name: 'Export Fresh Keitt & Kent Mangoes',
    category: 'Fruits & Vegetables',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Middle Belt & Volta Region)',
    status: 'PUBLISHED',
    description: 'Fiberless, succulent Ghanaian mangoes. Carefully hot-water treated to prevent fruit fly contamination, hand-picked at firm mature stage.',
    moq: '1.5 Metric Tons',
    shelfLife: '2-3 Weeks (Reefer transit)',
    storageConditions: 'Reefer container (11°C).',
    packagingOptions: ['4kg Open-top Export Trays', '10kg Cartons'],
    certifications: ['GlobalG.A.P. Certified', 'Phytosanitary Certificate'],
    targetMarkets: ['Europe', 'Middle East'],
    imageUrl: '/images/fruits-vegetables.jpg',
    featured: false
  },

  // 7. DRIED & PROCESSED FOODS
  {
    id: 'dried-1',
    name: 'Solar-Dried Industrial Cassava Chips',
    category: 'Dried & Processed Foods',
    type: 'Processed Product',
    origin: 'Ghana (Bono & Eastern Regions)',
    status: 'PUBLISHED',
    description: 'Clean, solar-dehydrated cassava root chips. Starch content >70%, moisture <13%, zero sand or metal impurities. Ideal for alcohol distillation and bio-starch processing.',
    moq: '20 Metric Tons (Bulk Container)',
    shelfLife: '24 Months',
    storageConditions: 'Dry, moisture-proof bulk storage.',
    packagingOptions: ['50kg PP Bags', 'Bulk Container Loading'],
    certifications: ['Phytosanitary Certificate', 'Lab Starch Assay'],
    targetMarkets: ['Asia', 'Europe'],
    imageUrl: '/images/hero-cassava-roots.jpg',
    featured: false
  },
  {
    id: 'dried-2',
    name: 'Dehydrated Organic Mango & Pineapple Slices',
    category: 'Dried & Processed Foods',
    type: 'Processed Product',
    origin: 'Ghana (Eastern Processing Plant)',
    status: 'PUBLISHED',
    description: '100% natural solar-dried fruit slices with zero added sugar, sulfur dioxide, or preservatives. Chewy texture, intense natural tropical sweetness.',
    moq: '500 kg',
    shelfLife: '12 Months',
    storageConditions: 'Cool dry place in nitrogen-flushed foil bags.',
    packagingOptions: ['10kg Bulk Foil Cartons', '100g Retail Pouches'],
    certifications: ['FDA Ghana Certified', 'HACCP Standard'],
    targetMarkets: ['Europe', 'North America'],
    imageUrl: '/images/fruits-vegetables.jpg',
    featured: false
  },

  // 8. OILS & FATS
  {
    id: 'oil-1',
    name: 'Unrefined Organic Raw Shea Butter (Grade A)',
    category: 'Oils & Fats',
    type: 'Processed Product',
    origin: 'Ghana (Northern Region Women Cooperatives)',
    status: 'PUBLISHED',
    description: '100% pure hand-extracted raw Grade-A shea butter. Creamy texture, natural nutty aroma, unbleached, rich in vitamins A & E for cosmetic and food formulation.',
    moq: '1 Metric Ton',
    shelfLife: '24 Months',
    storageConditions: 'Cool dry store away from direct sunlight.',
    packagingOptions: ['25kg Plastic Drums / Boxes', '200kg Metal Drums'],
    certifications: ['ECOCERT Organic Option', 'FDA Ghana Registered', 'SGS Quality CoA'],
    targetMarkets: ['North America', 'Europe', 'Asia'],
    imageUrl: '/images/agro-processing-factory.jpg',
    featured: true
  },
  {
    id: 'oil-2',
    name: 'Virgin Cold-Pressed Coconut Oil',
    category: 'Oils & Fats',
    type: 'Processed Product',
    origin: 'Ghana (Western Region Belt)',
    status: 'PUBLISHED',
    description: 'Crystal clear extra virgin coconut oil cold-pressed from fresh Ghanaian coconuts. Lauric acid content >50%, rich aroma, non-hydrogenated.',
    moq: '1 Metric Ton',
    shelfLife: '24 Months',
    storageConditions: 'Ambient temperature, seals tight.',
    packagingOptions: ['20L Food-grade Pails', '200L Steel Drums', '500ml Glass Bottles'],
    certifications: ['FDA Ghana Registered', 'HACCP Food Safety'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/agro-processing-factory.jpg',
    featured: false
  },

  // 9. BEVERAGES
  {
    id: 'bev-1',
    name: 'Hibiscus / Sobolo Flower Concentrate & Dried Calyx',
    category: 'Beverages',
    type: 'Processed Product',
    origin: 'Ghana (Upper West & Northern Regions)',
    status: 'PUBLISHED',
    description: 'Deep red dried Hibiscus sabdariffa calyces and liquid concentrate. Rich in antioxidants and vitamin C, used for natural herbal tea blending and refreshing Sobolo drinks.',
    moq: '500 kg',
    shelfLife: '24 Months',
    storageConditions: 'Dry moisture-proof storage.',
    packagingOptions: ['25kg Baled Bags', '5L Liquid Concentrate Drums'],
    certifications: ['FDA Ghana Certified', 'Phytosanitary Clearance'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/hero-ghana-spices.jpg',
    featured: false
  },

  // 10. AGRO-PROCESSED PRODUCTS
  {
    id: 'proc-1',
    name: 'Ghana Authentic Shito (Spicy Black Pepper Sauce)',
    category: 'Agro-Processed Products',
    type: 'Processed Product',
    origin: 'Ghana (Greater Accra Kitchen Facility)',
    status: 'PUBLISHED',
    description: 'Traditional Ghanaian hot pepper sauce cooked with caramelized onions, dried fish, shrimp, chili, and spices. Rich umami flavor, long shelf stability.',
    moq: '500 Jars',
    shelfLife: '18 Months',
    storageConditions: 'Store in cool dry pantry.',
    packagingOptions: ['500g Glass Jars', '1kg Commercial Catering Tubs'],
    certifications: ['FDA Ghana Certified', 'Export Clearance'],
    targetMarkets: ['North America', 'Europe', 'Global Diaspora'],
    imageUrl: '/images/hero-ghana-spices.jpg',
    featured: true
  },

  // 11. NUTS & SEEDS
  {
    id: 'nut-1',
    name: 'Raw & Processed Cashew Nuts (W240 / W320)',
    category: 'Nuts & Seeds',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Bono & Savanna Regions)',
    status: 'PUBLISHED',
    description: 'Premium Ghanaian cashew nuts. Sourced as Raw Cashew Nuts (RCN out-turn >48 lbs) or vacuum-packed roasted/plain kernels (W240, W320 grades).',
    moq: '5 Metric Tons',
    shelfLife: '18 Months',
    storageConditions: 'Vacuum-sealed storage in cool warehouse.',
    packagingOptions: ['50kg Jute Bags (RCN)', '25lb Vacuum Tins (Kernels)'],
    certifications: ['Phytosanitary Certificate', 'AFI Standard Grade Cert'],
    targetMarkets: ['India', 'Vietnam', 'Europe', 'North America'],
    imageUrl: '/images/hero-white-maize.jpg',
    featured: true
  },

  // 12. ORGANIC & SPECIALTY PRODUCTS
  {
    id: 'organic-1',
    name: 'Organic Ghanaian Moringa & Baobab Leaf Powder',
    category: 'Organic & Specialty Products',
    type: 'Processed Product',
    origin: 'Ghana (Upper East Region)',
    status: 'PUBLISHED',
    description: '100% organic nutrient-dense superfood powders. Shade-dried moringa leaves and wild-harvested raw baobab fruit pulp powder. Rich in vitamin C, calcium, and fiber.',
    moq: '250 kg',
    shelfLife: '24 Months',
    storageConditions: 'Airtight light-shielded packaging.',
    packagingOptions: ['20kg Foil Bags', '250g Pouches'],
    certifications: ['ECOCERT Organic', 'FDA Ghana Registered'],
    targetMarkets: ['Europe', 'North America', 'Asia'],
    imageUrl: '/images/hero-ghana-spices.jpg',
    featured: true
  }
];

export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [rfqs, setRfqs] = useState<RFQItem[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierApplication[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([
    {
      id: 'cert-1',
      title: 'FDA Ghana Food Export Registration',
      issuingBody: 'Food and Drugs Authority Ghana',
      certificateNumber: 'FDA/FE-2026-9042',
      issueDate: '2025-01-15',
      expiryDate: '2027-01-14',
      status: 'ACTIVE'
    },
    {
      id: 'cert-2',
      title: 'MoFA Phytosanitary Export Sanitation Certificate',
      issuingBody: 'Ministry of Food and Agriculture (Plant Protection Service)',
      certificateNumber: 'PPRSD-GH-8841',
      issueDate: '2025-03-01',
      expiryDate: '2026-03-01',
      status: 'ACTIVE'
    },
    {
      id: 'cert-3',
      title: 'GEPA Non-Traditional Export Clearance',
      issuingBody: 'Ghana Export Promotion Authority',
      certificateNumber: 'GEPA/NTE-7721',
      issueDate: '2024-06-10',
      expiryDate: '2026-06-10',
      status: 'ACTIVE'
    }
  ]);

  const [articles, setArticles] = useState<ArticleItem[]>([
    {
      id: 'art-1',
      title: 'Expanding European Demand for Ghanaian High Quality Cassava Flour',
      slug: 'ghanaian-cassava-flour-europe-demand',
      category: 'Market Trends',
      excerpt: 'How gluten-free food manufacturing in Europe is creating steady multi-ton contracts for Ghanaian cassava processors.',
      content: 'As European food manufacturers seek sustainable, non-GMO, gluten-free starch alternatives to wheat flour, High Quality Cassava Flour (HQCF) produced in Ghana has emerged as a top candidate...',
      author: 'Trade Desk Research',
      publishedDate: '2026-07-20',
      readTime: '4 min read',
      imageUrl: '/images/hero-flours-starches.jpg',
      status: 'PUBLISHED'
    },
    {
      id: 'art-2',
      title: 'Navigating EU & US Phytosanitary Import Regulations for Fresh Yams & Fruits',
      slug: 'phytosanitary-export-guidelines-ghana',
      category: 'Export Compliance',
      excerpt: 'Essential inspection steps, hot water treatment protocols, and packaging criteria for shipping Ghanaian produce.',
      content: 'Exporters shipping fresh tubers and pineapples to European and North American ports must maintain unbroken phytosanitary standards...',
      author: 'Compliance Team',
      publishedDate: '2026-07-15',
      readTime: '6 min read',
      imageUrl: '/images/import-export-shipping.jpg',
      status: 'PUBLISHED'
    }
  ]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const addRFQ = (rfq: RFQItem) => {
    setRfqs(prev => [rfq, ...prev]);
  };

  const updateRFQStatus = (id: string, status: RFQItem['status']) => {
    setRfqs(prev => prev.map(r => r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r));
  };

  const addSupplierApplication = (supplier: Omit<SupplierApplication, 'id' | 'createdAt' | 'status'>) => {
    const newSupplier: SupplierApplication = {
      ...supplier,
      id: `supp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'PENDING'
    };
    setSuppliers(prev => [newSupplier, ...prev]);
  };

  const updateSupplierStatus = (id: string, status: SupplierApplication['status']) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <DatabaseContext.Provider value={{
      products,
      rfqs,
      suppliers,
      certifications,
      articles,
      addProduct,
      updateProduct,
      addRFQ,
      updateRFQStatus,
      addSupplierApplication,
      updateSupplierStatus
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
