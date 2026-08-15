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
  {
    id: 'prod-1',
    name: 'Ghanaian Premium Pona Yam Tubers',
    category: 'Staple Food Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Northern & Bono East Regions)',
    status: 'PUBLISHED',
    description: 'Grade-A export quality white Pona yams. Firm texture, high dry-matter content, sweet aroma, carefully washed, sanitized, and paper-wrapped for long transit export shipping.',
    moq: '5 Metric Tons (20ft Container)',
    shelfLife: '3 Months (Ventilated export container)',
    storageConditions: 'Dry, well-ventilated ambient temperature (12-15°C).',
    packagingOptions: ['25kg Wooden Crates', '20kg Cardboard Cartons', 'Custom Palletized Boxes'],
    certifications: ['Phytosanitary Certificate', 'FDA Ghana Export Clearance', 'GEPA Verified'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/fresh yam.jpeg',
    featured: true
  },
  {
    id: 'prod-2',
    name: 'Export-Grade Fresh Green Plantain',
    category: 'Staple Food Products',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Ashanti & Western Regions)',
    status: 'PUBLISHED',
    description: 'Unripened green plantains harvested at optimal maturity. Firm fingers, vibrant green skin, high nutrient density for cooking, frying, or plantain flour processing.',
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
    id: 'prod-3',
    name: 'Premium Pure Plantain Flour',
    category: 'Flours & Starches',
    type: 'Processed Product',
    origin: 'Ghana (Eastern & Ashanti Regions)',
    status: 'PUBLISHED',
    description: '100% natural, unadulterated green plantain flour. Rich in dietary fiber and resistant starch, low glycemic index, ideal for healthy swallow meals and gluten-free baking.',
    moq: '1 Metric Ton',
    shelfLife: '18 Months',
    storageConditions: 'Cool dry place away from direct sunlight.',
    packagingOptions: ['1kg & 2.5kg Zip Pouches', '20kg Kraft Paper Bags'],
    certifications: ['FDA Ghana Certified', 'HACCP Compliant'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/plantain flour.jpeg',
    featured: true
  },
  {
    id: 'prod-4',
    name: 'Export-Grade Roasted Cassava Gari',
    category: 'Flours & Starches',
    type: 'Processed Product',
    origin: 'Ghana (Volta & Eastern Regions)',
    status: 'PUBLISHED',
    description: 'Hygienically processed, fermented, and double-roasted cassava granules. Available in crisp White Gari and Palm Oil Enriched Yellow Gari. Free from sand or stone impurities.',
    moq: '2 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Sealed moisture-proof container in dry ambient storage.',
    packagingOptions: ['1kg Zip Pouches', '5kg & 20kg Export Sacks'],
    certifications: ['FDA Ghana Registered', 'Phytosanitary Clearance'],
    targetMarkets: ['North America', 'Europe', 'ECOWAS'],
    imageUrl: '/images/gari.jpeg',
    featured: true
  },
  {
    id: 'prod-5',
    name: 'Traditional Banku Flour Mix',
    category: 'Flours & Starches',
    type: 'Processed Product',
    origin: 'Ghana (Greater Accra Processing Hub)',
    status: 'PUBLISHED',
    description: 'Pre-formulated, authentic blend of fermented corn and cassava flour. Allows quick, convenient preparation of smooth, elastic, traditional Ghanaian Banku.',
    moq: '1 Metric Ton',
    shelfLife: '12 Months',
    storageConditions: 'Sealed moisture-barrier packaging.',
    packagingOptions: ['1kg, 2.5kg & 5kg Retail Pouches', '25kg Bulk Bags'],
    certifications: ['FDA Ghana Certified'],
    targetMarkets: ['Europe', 'North America', 'Global Retail'],
    imageUrl: '/images/banku flour mix.jpeg',
    featured: true
  },
  {
    id: 'prod-6',
    name: 'Ghanaian White Fermented Corn Dough',
    category: 'Flours & Starches',
    type: 'Processed Product',
    origin: 'Ghana (Central & Eastern Regions)',
    status: 'PUBLISHED',
    description: 'Freshly milled and fermented white corn dough (Mmore). Prepared under strict hygienic standards for making authentic Banku, Kenkey, and traditional porridges.',
    moq: '500 kg',
    shelfLife: '6 Months (Vacuum-sealed Chilled) / 12 Months (Frozen)',
    storageConditions: 'Refrigerated at 4°C or deep frozen at -18°C.',
    packagingOptions: ['1kg & 5kg Vacuum Pouches', '10kg Sealed Tubs'],
    certifications: ['FDA Ghana Approved Sanitation'],
    targetMarkets: ['Europe', 'North America', 'Domestic Bulk'],
    imageUrl: '/images/corn dough_white.jpeg',
    featured: false
  },
  {
    id: 'prod-7',
    name: 'Ghanaian Yellow Fermented Corn Dough',
    category: 'Flours & Starches',
    type: 'Processed Product',
    origin: 'Ghana (Ashanti & Bono Regions)',
    status: 'PUBLISHED',
    description: 'Rich, nutrient-dense yellow corn dough milled from high-quality yellow maize. Naturally fermented, providing distinct flavor and rich color for specialty traditional dishes.',
    moq: '500 kg',
    shelfLife: '6 Months (Vacuum-sealed Chilled) / 12 Months (Frozen)',
    storageConditions: 'Refrigerated at 4°C or deep frozen at -18°C.',
    packagingOptions: ['1kg & 5kg Vacuum Pouches', '10kg Sealed Tubs'],
    certifications: ['FDA Ghana Approved Sanitation'],
    targetMarkets: ['Europe', 'North America', 'ECOWAS'],
    imageUrl: '/images/corn dough_yellow.jpeg',
    featured: false
  },
  {
    id: 'prod-8',
    name: 'Natural Dried Corn Husks',
    category: 'Agro-Processed Products',
    type: 'Processed Product',
    origin: 'Ghana (Ashanti & Volta Regions)',
    status: 'PUBLISHED',
    description: 'Cleaned, sun-dried, sanitized natural corn husks. Essential eco-friendly wrapping material for authentic Ga & Fante Kenkey, tamales, and natural food steaming.',
    moq: '200 kg',
    shelfLife: '24 Months',
    storageConditions: 'Dry, pest-free warehouse storage.',
    packagingOptions: ['10kg Compressed Bales', 'Bulk Export Cartons'],
    certifications: ['Phytosanitary Clearance', 'FDA Inspected'],
    targetMarkets: ['North America', 'Europe', 'Global Specialty Distributors'],
    imageUrl: '/images/corn husk.jpeg',
    featured: false
  },
  {
    id: 'prod-9',
    name: 'Ghanaian Black-Eyed Cowpeas (Beans)',
    category: 'Grains, Beans & Legumes',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Northern & Savanna Regions)',
    status: 'PUBLISHED',
    description: 'Hand-sorted, machine-cleaned black-eyed cowpeas. Uniform grain size, moisture controlled below 12%, pesticide residue free, high protein content for retail and food service.',
    moq: '3 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Fumigated dry warehouse on wooden pallets.',
    packagingOptions: ['50kg Jute Sacks', '25kg PP Woven Sacks', '5kg Retail Packs'],
    certifications: ['Phytosanitary Certificate', 'MoFA Quality Inspection'],
    targetMarkets: ['Europe', 'North America', 'ECOWAS'],
    imageUrl: '/images/Cowpeas.jpg',
    featured: true
  },
  {
    id: 'prod-10',
    name: 'Premium Whole Grain Soybeans',
    category: 'Grains, Beans & Legumes',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Northern & Upper West Regions)',
    status: 'PUBLISHED',
    description: 'Non-GMO, high-protein Ghanaian soybeans. High oil content, clean seeds, free of foreign matter, suitable for soy milk extraction, tofu, vegetable oil, and animal feed milling.',
    moq: '5 Metric Tons',
    shelfLife: '24 Months',
    storageConditions: 'Dry, temperature-monitored grain store.',
    packagingOptions: ['50kg Woven PP Sacks', '1 Metric Ton Jumbo Totes'],
    certifications: ['Non-GMO Certificate', 'Phytosanitary Inspection'],
    targetMarkets: ['West Africa', 'Europe', 'Asia'],
    imageUrl: '/images/Soybeans.jpg',
    featured: false
  },
  {
    id: 'prod-11',
    name: 'Natural Prekese (Aidan Fruit)',
    category: 'Spices & Seasonings',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Forest Belt - Western & Eastern Regions)',
    status: 'PUBLISHED',
    description: 'Aromatic dried pods of Tetrapleura tetraptera (Prekese). Highly prized in traditional West African culinary soups, herbal teas, and natural wellness remedies.',
    moq: '100 kg',
    shelfLife: '24 Months',
    storageConditions: 'Dry ambient storage in sealed cartons.',
    packagingOptions: ['10kg Export Cartons', '1kg Retail Pouches'],
    certifications: ['Phytosanitary Certificate', 'FDA Clearance'],
    targetMarkets: ['Europe', 'North America', 'Global Diaspora Outlets'],
    imageUrl: '/images/Prekese.jpg',
    featured: true
  },
  {
    id: 'prod-12',
    name: 'Ghanaian Curry Powder & Spice Blend',
    category: 'Spices & Seasonings',
    type: 'Processed Product',
    origin: 'Ghana (Greater Accra Processing Facility)',
    status: 'PUBLISHED',
    description: 'Vibrant, rich blend of authentic herbs and ground spices including ginger, nutmeg, turmeric, and local peppers. Adds rich aroma and deep gold color to stews and rice dishes.',
    moq: '250 kg',
    shelfLife: '24 Months',
    storageConditions: 'Sealed light-proof container in cool dry place.',
    packagingOptions: ['500g Glass Jars', '1kg Foil Stand-up Pouches', '10kg Sacks'],
    certifications: ['FDA Ghana Certified'],
    targetMarkets: ['North America', 'Europe', 'ECOWAS'],
    imageUrl: '/images/curry powder.jpeg',
    featured: false
  },
  {
    id: 'prod-13',
    name: 'Fresh Ghanaian Whole Coconut',
    category: 'Fruits & Vegetables',
    type: 'Agricultural Commodity',
    origin: 'Ghana (Western & Central Coastal Belts)',
    status: 'PUBLISHED',
    description: 'Freshly harvested sweet Ghanaian green and mature husked coconuts. Rich in natural coconut water, firm jelly meat, sourced directly from coastal coconut farms.',
    moq: '2,000 Pieces (FCL Container)',
    shelfLife: '6-8 Weeks',
    storageConditions: 'Ventilated reefer storage (12-14°C).',
    packagingOptions: ['Wooden Crates', 'Net Mesh Sacks (25-30 pieces)'],
    certifications: ['Phytosanitary Certificate', 'GEPA Export Clearance'],
    targetMarkets: ['Europe', 'North America', 'Middle East'],
    imageUrl: '/images/coconut.jpg',
    featured: true
  },
  {
    id: 'prod-14',
    name: 'Packaged Dried Coconut & Copra',
    category: 'Dried & Processed Foods',
    type: 'Processed Product',
    origin: 'Ghana (Western Region Agro-Hub)',
    status: 'PUBLISHED',
    description: 'Hygienically dried coconut flakes, desiccated coconut, and premium copra. Low moisture content (<3%), rich in natural coconut oil, packaged for food baking and industrial oil extraction.',
    moq: '1 Metric Ton',
    shelfLife: '18 Months',
    storageConditions: 'Cool dry place away from heat.',
    packagingOptions: ['15kg Kraft Vacuum Bags', '500g Retail Pouches'],
    certifications: ['FDA Ghana Certified'],
    targetMarkets: ['Europe', 'North America', 'Asia'],
    imageUrl: '/images/package coconut.jpeg',
    featured: false
  },
  {
    id: 'prod-15',
    name: 'Ghanaian Asanka (Traditional Mortar & Grinding Bowl)',
    category: 'Agro-Processed Products',
    type: 'Processed Product',
    origin: 'Ghana (Ashanti Region Pottery Artisans)',
    status: 'PUBLISHED',
    description: 'Authentic kiln-fired earthenware grinding bowl with grooved interior and wooden masher (Tapoli). Essential traditional Ghanaian kitchenware for preparing fresh salsa, pepper, and sauces.',
    moq: '100 Sets',
    shelfLife: 'Indefinite',
    storageConditions: 'Cushioned carton storage.',
    packagingOptions: ['Individual bubble-wrapped export cartons', '10-Pack Master Cartons'],
    certifications: ['Authentic Ghanaian Craftmanship Clearance'],
    targetMarkets: ['Global Diaspora Outlets', 'Specialty Cultural Retailers'],
    imageUrl: '/images/asanka.jpg',
    featured: false
  },
  {
    id: 'prod-16',
    name: 'Ghanaian Dried Waakye Leaves',
    category: 'Organic & Specialty Products',
    type: 'Processed Product',
    origin: 'Ghana (Northern & Volta Regions)',
    status: 'PUBLISHED',
    description: 'Authentic dried red sorghum stalk leaves (Waakye Leaves). Essential natural colorant and aromatic herb for preparing traditional Ghanaian Waakye rice and beans.',
    moq: '100 Bundles',
    shelfLife: '24 Months',
    storageConditions: 'Dry, pest-free warehouse storage.',
    packagingOptions: ['100g Retail Packs', '1kg Bundles', '10kg Master Cartons'],
    certifications: ['Phytosanitary Clearance', 'FDA Ghana Registered'],
    targetMarkets: ['Europe', 'North America', 'Global Diaspora Outlets'],
    imageUrl: '/images/waakye leaves.jpg',
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
      title: 'Expanding European & US Demand for Ghanaian Fresh Yam & Cassava Derivatives',
      slug: 'ghanaian-fresh-yam-cassava-europe-demand',
      category: 'Market Trends',
      excerpt: 'How growing Diaspora populations and health-conscious gluten-free consumers in Western markets are driving steady multi-ton container orders for Ghanaian Pona yams and gari.',
      content: 'As European and North American food distributors expand their ethnic and natural food aisles, demand for authentic Ghanaian agricultural produce has reached unprecedented levels. Grade-A Pona white yams and hygienic cassava derivatives like High-Quality Cassava Flour (HQCF) and double-roasted Gari are top-tier exports.\n\nKey export success factors rely heavily on unbroken cold-chain logistics, proper paper-wrapping of yams to control transpiration, and moisture barrier export packaging (<12% moisture). Jal Expo Enterprise remains at the forefront of delivering phytosanitary-certified agricultural shipments directly from Ghanaian farm hubs to international sea ports.',
      author: 'Jal Expo Trade Desk',
      publishedDate: '2026-08-01',
      readTime: '4 min read',
      imageUrl: '/images/fresh yam.jpeg',
      status: 'PUBLISHED'
    },
    {
      id: 'art-2',
      title: 'Navigating FDA Ghana & International Phytosanitary Import Clearances',
      slug: 'phytosanitary-export-guidelines-ghana',
      category: 'Export Compliance',
      excerpt: 'A comprehensive guide to inspection protocols, laboratory moisture testing, and export documentation required for shipping Ghanaian food produce worldwide.',
      content: 'Navigating international trade compliance for fresh tubers, legumes, and processed foods requires strict adherence to institutional standards. The Food and Drugs Authority (FDA) Ghana and Ministry of Food & Agriculture (PPRSD) mandate strict lab assays for aflatoxins (<4ppb), pesticide residues, and microbial counts prior to issuing phytosanitary clearance.\n\nProper container loading procedures—such as utilizing temperature-monitored reefer containers for green plantains and fresh coconuts—ensure products arrive at destination ports in prime condition.',
      author: 'Quality & Regulatory Dept',
      publishedDate: '2026-07-28',
      readTime: '6 min read',
      imageUrl: '/images/Green plantain.jpg',
      status: 'PUBLISHED'
    },
    {
      id: 'art-3',
      title: 'The Rise of Prekese & Indigenous Ghanaian Spices in Global Gourmet Markets',
      slug: 'prekese-indigenous-spices-global-markets',
      category: 'Agro-Processing',
      excerpt: 'Exploring the rich culinary and health benefits of Tetrapleura tetraptera (Prekese), natural curry blends, and West African botanical seasonings.',
      content: 'Indigenous West African botanicals are gaining international acclaim among gourmet chefs and health-conscious consumers. Prekese (Aidan Fruit) is celebrated for its aromatic fragrance, natural sweetness, and antioxidants.\n\nAgro-processing advances have enabled Jal Expo Enterprise to supply sun-dried Prekese pods and custom curry powder blends in sanitized, vacuum-sealed packaging suitable for both commercial food production and retail distribution.',
      author: 'Agro-Processing Unit',
      publishedDate: '2026-07-15',
      readTime: '5 min read',
      imageUrl: '/images/Prekese.jpg',
      status: 'PUBLISHED'
    },
    {
      id: 'art-4',
      title: 'Value-Addition in Cassava & Corn: From Fermented Dough to Export-Ready Flours',
      slug: 'value-addition-cassava-corn-flours',
      category: 'Agro-Processing',
      excerpt: 'How modern micro-milling, hygienic flash drying, and nitrogen flushing elevate humble staple crops into premium packaged retail commodities.',
      content: 'Value addition in Ghanaian agriculture represents an immense economic opportunity. Transforming raw cassava tubers into High-Quality Cassava Flour (HQCF), Banku Flour Mix, and fermented White/Yellow Corn Dough allows smallholder farmers to capture significantly higher margins.\n\nOur modern agro-processing facilities utilize food-grade stainless steel surfaces, automated moisture sensors, and sealed vacuum pouches to extend product shelf life up to 24 months without synthetic preservatives.',
      author: 'Industrial Engineering Team',
      publishedDate: '2026-07-02',
      readTime: '5 min read',
      imageUrl: '/images/gari.jpeg',
      status: 'PUBLISHED'
    },
    {
      id: 'art-5',
      title: 'Sourcing High-Protein Soybeans & Cowpeas from Ghana Northern Farming Belts',
      slug: 'sourcing-soybeans-cowpeas-ghana',
      category: 'Market Trends',
      excerpt: 'An overview of grain quality standards, aflatoxin prevention, and cooperative farmer partnerships across the Savanna and Northern regions.',
      content: 'Ghana’s Northern and Savanna regions produce premium non-GMO soybeans and black-eyed cowpeas. With high protein concentrations and low moisture levels, these grains are sought after for human consumption and commercial feed manufacturing.\n\nJal Expo Enterprise works directly with local farming cooperatives to provide fair pricing, post-harvest drying equipment, and mechanized de-stoning to guarantee clean, stone-free grain shipments.',
      author: 'Sourcing & Farmer Relations',
      publishedDate: '2026-06-20',
      readTime: '4 min read',
      imageUrl: '/images/Cowpeas.jpg',
      status: 'PUBLISHED'
    },
    {
      id: 'art-6',
      title: 'Preserving Heritage Kitchenware: Global Export of Authentic Earthenware Asanka',
      slug: 'exporting-authentic-earthenware-asanka',
      category: 'Market Trends',
      excerpt: 'Connecting traditional Ghanaian artisan pottery with diaspora markets through specialized shock-absorbent export packaging.',
      content: 'The Asanka (earthenware grinding mortar) remains a cherished fixture of West African culinary culture. Handcrafted by master pottery artisans in Ghana, each bowl features ridged interior walls ideal for crushing fresh peppers, tomatoes, and herbs.\n\nTo safely export these delicate artisanal products worldwide, Jal Expo Enterprise developed custom multi-layer bubble cushioning and reinforced master cartons, making authentic Ghanaian kitchenware available to chefs and households globally.',
      author: 'Cultural Trade Desk',
      publishedDate: '2026-06-05',
      readTime: '3 min read',
      imageUrl: '/images/asanka.webp',
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
