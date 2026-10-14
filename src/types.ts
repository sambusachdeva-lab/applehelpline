export interface CountryHelpline {
  country: string;
  code: string;
  tollFree: string;
  localHours: string;
  languages: string[];
  department?: string;
}

export interface ProductLine {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description: string;
}

export interface SupportTopic {
  id: string;
  title: string;
  productId?: string;
  category: 'repairs' | 'battery' | 'passwords' | 'billing' | 'performance' | 'connectivity';
  summary: string;
  quickSteps: string[];
  recommendedChannel: 'call' | 'chat' | 'reservation';
}

export interface CoverageResult {
  serialNumber: string;
  modelName: string;
  purchaseDate: string;
  appleCareStatus: 'active' | 'expired' | 'eligible';
  planName: string;
  coverageEndDate: string;
  repairsEligible: boolean;
  telephoneSupportEligible: boolean;
  expressReplacementEligible: boolean;
  batteryHealthEstimate?: string;
}

export interface RepairPriceEstimate {
  productId: string;
  model: string;
  serviceType: string;
  outOfWarrantyPrice: number;
  appleCarePrice: number;
  estimatedTurnaround: string;
}

export interface ChatMessage {
  id: string;
  sender: 'advisor' | 'user' | 'system';
  advisorName?: string;
  text: string;
  timestamp: string;
  actions?: { label: string; actionId: string }[];
}

export interface GeniusBarAppointment {
  id: string;
  storeName: string;
  address: string;
  date: string;
  time: string;
  product: string;
  issueDescription: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationCode: string;
}

export interface RepairCase {
  caseId: string;
  serialNumber: string;
  product: string;
  status: 'received' | 'diagnosing' | 'parts_ordered' | 'repairing' | 'quality_testing' | 'ready_for_pickup';
  statusDescription: string;
  lastUpdated: string;
  estimatedCompletion: string;
  serviceCenter: string;
}
