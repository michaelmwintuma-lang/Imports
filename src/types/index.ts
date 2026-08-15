export type ProductCategory =
  | 'Staple Food Products'
  | 'Processed Cassava Products'
  | 'Grains, Beans & Legumes'
  | 'Spices & Seasonings'
  | 'Cocoa & Coffee Products'
  | 'Fruits & Vegetables'
  | 'Dried & Processed Foods'
  | 'Oils & Fats'
  | 'Beverages'
  | 'Agro-Processed Products'
  | 'Nuts & Seeds'
  | 'Organic & Specialty Products'
  | 'Flours & Starches'
  | 'All';

export type ProductType = 'Agricultural Commodity' | 'Processed Product';

export type ProductStatus = 'PUBLISHED' | 'DRAFT' | 'HIDDEN';

export interface Product {
  id: string;
  name: string;
  category: string;
  type?: ProductType;
  origin: string;
  status: ProductStatus;
  shortDescription?: string;
  description: string;
  availableForms?: string[];
  processingMethod?: string;
  moq: string; // Minimum Order Quantity
  shelfLife?: string;
  storageConditions?: string;
  seasonality?: string;
  hsCode?: string;
  packagingOptions: string[];
  certifications?: string[];
  targetMarkets?: string[];
  imageUrl: string;
  specifications?: Record<string, string>;
  featured?: boolean;
}

export type RFQStatus = 'NEW' | 'REVIEWING' | 'QUOTED' | 'NEGOTIATING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface RFQItem {
  id: string;
  createdAt: string;
  rfqNumber: string; // e.g., RFQ-2026-8942
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  whatsApp?: string;
  productName: string;
  quantity: string;
  unit: string;
  packagingPreference: string;
  destinationPort: string;
  requiredDeliveryDate?: string;
  specificationsRequired?: string;
  additionalNotes?: string;
  status: RFQStatus;
  adminNotes?: string[];
  updatedAt?: string;
}

export interface SupplierApplication {
  id: string;
  createdAt: string;
  farmOrCompanyName: string;
  contactPerson: string;
  locationRegion: string;
  locationDistrict?: string;
  email: string;
  phone: string;
  productsSupplied: string[];
  productionCapacityPerSeason: string;
  harvestSeasons: string;
  hasCertifications: boolean;
  certificationDetails?: string;
  notes?: string;
  status: 'PENDING' | 'REVIEWED' | 'APPROVED' | 'ARCHIVED';
}

export interface TraceabilityBatch {
  batchNumber: string;
  productName: string;
  originRegion: string;
  farmerGroup: string;
  harvestDate: string;
  processingDate: string;
  facilityLocation: string;
  qualityInspectionStatus: 'PASSED' | 'GRADE A PREMIUM' | 'PENDING';
  moistureContent: string;
  purityGrade: string;
  packagingDate: string;
  exportCertNumber: string;
  labTestReportSummary: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuingBody: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'DRAFT' | 'EXPIRED';
  pdfUrl?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  status: 'PUBLISHED' | 'DRAFT';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedIn?: string;
  status: 'PUBLISHED' | 'DRAFT';
}

export interface SectorImages {
  'Staple Food Products'?: string;
  'Processed Cassava Products'?: string;
  'Grains, Beans & Legumes'?: string;
  'Spices & Seasonings'?: string;
  'Cocoa & Coffee Products'?: string;
  'Fruits & Vegetables'?: string;
  'Dried & Processed Foods'?: string;
  'Oils & Fats'?: string;
  'Beverages'?: string;
  'Agro-Processed Products'?: string;
  'Nuts & Seeds'?: string;
  'Organic & Specialty Products'?: string;
  'Flours & Starches'?: string;
  [key: string]: string | undefined;
}

export interface CompanyConfig {
  companyName: string;
  tagline: string;
  supportingStatement: string;
  companyDescription: string;
  phone: string;
  additionalPhone?: string;
  whatsApp: string;
  whatsAppPreFilledMsg: string;
  email: string;
  address: string;
  poBox?: string;
  digitalAddress?: string;
  landmark?: string;
  businessHours: string;
  exportMarkets: string[];
  processingCapabilities: string[];
  mission: string;
  vision: string;
  coreValues: string[];
  logoUrl?: string;
  sectorImages: SectorImages;
  yearEstablished?: string;
  fdaRegistered?: boolean;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}
