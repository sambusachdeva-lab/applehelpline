import { CountryHelpline, ProductLine, SupportTopic, RepairPriceEstimate, CoverageResult, RepairCase } from '../types';

export const OFFICIAL_HELPLINE_NUMBERS: CountryHelpline[] = [
  {
    country: 'United States',
    code: 'US',
    tollFree: '1-800-275-2273',
    localHours: '24/7, 365 days a year',
    languages: ['English', 'Spanish'],
    department: 'Toll-free (1-800-APL-CARE)'
  },
  {
    country: 'Canada',
    code: 'CA',
    tollFree: '1-800-263-3394',
    localHours: '24/7, 365 days a year',
    languages: ['English', 'French'],
    department: 'AppleCare Technical Helpline'
  },
  {
    country: 'United Kingdom',
    code: 'GB',
    tollFree: '0800 107 6285',
    localHours: 'Mon-Sun: 08:00 - 20:00 GMT',
    languages: ['English'],
    department: 'Apple UK Freephone Helpline'
  },
  {
    country: 'India',
    code: 'IN',
    tollFree: '000800 100 9009',
    localHours: 'Mon-Sun: 09:00 - 21:00 IST',
    languages: ['English', 'Hindi'],
    department: 'Apple India Toll-Free Support'
  },
  {
    country: 'Australia',
    code: 'AU',
    tollFree: '133-622',
    localHours: 'Mon-Sun: 08:00 - 20:00 AEST',
    languages: ['English'],
    department: 'Apple Australia Helpline'
  },
  {
    country: 'Germany',
    code: 'DE',
    tollFree: '0800 6645 451',
    localHours: 'Mo-Fr: 08:00 - 20:00, Sa: 09:00 - 18:00',
    languages: ['German', 'English'],
    department: 'AppleCare Support Deutschland'
  },
  {
    country: 'Japan',
    code: 'JP',
    tollFree: '0120-277-535',
    localHours: '9:00 - 21:00 JST (Year-round)',
    languages: ['Japanese', 'English'],
    department: 'Apple サポート窓口'
  },
  {
    country: 'Singapore',
    code: 'SG',
    tollFree: '800-186-1087',
    localHours: 'Mon-Sun: 09:00 - 21:00 SGT',
    languages: ['English', 'Mandarin'],
    department: 'Apple Singapore Toll-Free'
  },
  {
    country: 'Ireland',
    code: 'IE',
    tollFree: '1800 923 898',
    localHours: 'Mon-Sun: 08:00 - 20:00 GMT',
    languages: ['English'],
    department: 'Apple European Operations Support'
  },
  {
    country: 'France',
    code: 'FR',
    tollFree: '0805 540 003',
    localHours: 'Lun-Ven: 08:00 - 19:45, Sam: 09:00 - 18:00',
    languages: ['French'],
    department: 'Assistance AppleCare France'
  }
];

export const SPECIALIZED_DEPARTMENTS = [
  {
    id: 'apple_account',
    name: 'Apple Account & Security Helpline',
    tollFree: '1-800-275-2273',
    extension: 'Select Option 1 for Account Recovery',
    hours: '24 hours / 7 days',
    focus: 'Two-factor authentication locks, forgotten passwords, trusted phone updates, unauthorized charges.',
    recommendedAction: 'Start Account Recovery'
  },
  {
    id: 'hardware_repair',
    name: 'AppleCare+ Hardware & Mail-in Repair',
    tollFree: '1-800-275-2273',
    extension: 'Select Option 2 for Hardware Service',
    hours: '24 hours / 7 days',
    focus: 'Cracked screens, battery degradation, liquid contact inspection, Express Replacement dispatch.',
    recommendedAction: 'Check Coverage & Book'
  },
  {
    id: 'billing_subscriptions',
    name: 'Apple Services, App Store & Subscriptions',
    tollFree: '1-800-275-2273',
    extension: 'Select Option 3 for Billing Inquiries',
    hours: '7:00 AM – 10:00 PM CST',
    focus: 'iCloud+ storage, Apple One, App Store refunds, Family Sharing billing discrepancies.',
    recommendedAction: 'Request Subscription Review'
  },
  {
    id: 'accessibility',
    name: 'Accessibility & Assistive Tech Helpline',
    tollFree: '1-877-204-3930',
    extension: 'Direct Line for Accessibility',
    hours: '24 hours / 7 days (TTY Available: 1-800-833-6384)',
    focus: 'VoiceOver, Switch Control, Hearing device pairings, AssistiveTouch, Personal Voice setup.',
    recommendedAction: 'Connect to Specialist'
  },
  {
    id: 'enterprise_it',
    name: 'Apple at Work & Education IT Desk',
    tollFree: '1-866-752-7753',
    extension: 'Direct Enterprise Routing',
    hours: 'Monday – Friday: 7:00 AM – 7:00 PM CST',
    focus: 'Apple Business Manager, MDM profile enrollment, volume device deployment, institutional AppleCare.',
    recommendedAction: 'Verify Enterprise Contract'
  },
  {
    id: 'apple_card',
    name: 'Apple Card & Apple Cash Support',
    tollFree: '1-877-255-5923',
    extension: 'Goldman Sachs Bank USA Apple Card Desk',
    hours: '24 hours / 7 days',
    focus: 'Card disputes, Daily Cash balance inquiries, payment schedule adjustments, virtual card replacement.',
    recommendedAction: 'Open Wallet Support'
  }
];

export const PRODUCT_LINES: ProductLine[] = [
  {
    id: 'iphone',
    name: 'iPhone',
    category: 'mobile',
    iconName: 'Smartphone',
    description: 'iPhone 16 Pro, 16, 15, and earlier models'
  },
  {
    id: 'mac',
    name: 'Mac',
    category: 'computer',
    iconName: 'Laptop',
    description: 'MacBook Pro, MacBook Air, iMac, Mac Studio, Mac mini'
  },
  {
    id: 'ipad',
    name: 'iPad',
    category: 'tablet',
    iconName: 'Tablet',
    description: 'iPad Pro (M4), iPad Air (M2), iPad, iPad mini'
  },
  {
    id: 'watch',
    name: 'Apple Watch',
    category: 'wearable',
    iconName: 'Watch',
    description: 'Apple Watch Ultra 2, Series 10, SE'
  },
  {
    id: 'airpods',
    name: 'AirPods',
    category: 'audio',
    iconName: 'Headphones',
    description: 'AirPods Pro 2, AirPods 4, AirPods Max'
  },
  {
    id: 'vision',
    name: 'Apple Vision Pro',
    category: 'spatial',
    iconName: 'Glasses',
    description: 'visionOS, spatial computing, Light Seal fitting'
  },
  {
    id: 'account',
    name: 'Apple Account',
    category: 'services',
    iconName: 'KeyRound',
    description: 'Password reset, 2FA, iCloud, Family Sharing'
  },
  {
    id: 'billing',
    name: 'Billing & Subscriptions',
    category: 'services',
    iconName: 'CreditCard',
    description: 'App Store refunds, purchase history, payment methods'
  }
];

export const COMMON_SUPPORT_TOPICS: SupportTopic[] = [
  {
    id: 'forgot_password',
    title: 'If you forgot your Apple Account password',
    productId: 'account',
    category: 'passwords',
    summary: 'Reset your password instantly from a trusted device or request automated account recovery.',
    quickSteps: [
      'Go to Settings > [Your Name] > Sign-In & Security on an iPhone or iPad you already trust.',
      'Tap "Change Password" and enter your device passcode.',
      'If you have no trusted device, visit iforgot.apple.com in any web browser.',
      'Call the Apple Security Helpline if you need guided recovery assistance: 1-800-275-2273.'
    ],
    recommendedChannel: 'call'
  },
  {
    id: 'battery_drain',
    title: 'iPhone Battery & Performance Diagnostics',
    productId: 'iphone',
    category: 'battery',
    summary: 'Check Maximum Capacity percentage, optimize peak performance capability, or arrange a battery swap.',
    quickSteps: [
      'Open Settings > Battery > Battery Health & Charging.',
      'Review Maximum Capacity. If it drops below 80%, service is officially recommended.',
      'Toggle on "Clean Energy Charging" and "Optimized Battery Charging".',
      'Under AppleCare+, battery replacement is $0 if capacity is below 80%.'
    ],
    recommendedChannel: 'reservation'
  },
  {
    id: 'screen_repair',
    title: 'Cracked Front Screen & Back Glass Repair',
    productId: 'iphone',
    category: 'repairs',
    summary: 'Get genuine Apple parts installed by certified technicians to retain True Tone and water resistance.',
    quickSteps: [
      'Back up your device to iCloud or a computer before sending it for repair.',
      'Turn off "Find My" in Settings > [Your Name] > Find My before service.',
      'AppleCare+ front screen replacement fee is fixed at $29.',
      'Select a nearby Apple Store Genius Bar for same-day screen replacement.'
    ],
    recommendedChannel: 'reservation'
  },
  {
    id: 'cancel_subscription',
    title: 'Request a Refund or Cancel a Subscription',
    productId: 'billing',
    category: 'billing',
    summary: 'Review recent Apple purchases, cancel recurring subscriptions, or report an unauthorized charge.',
    quickSteps: [
      'Open Settings > [Your Name] > Subscriptions to view all active renewals.',
      'Select the item and tap "Cancel Subscription".',
      'For refund requests, submit within 90 days at reportaproblem.apple.com.',
      'Advisors can immediately assist with fraudulent charges via helpline.'
    ],
    recommendedChannel: 'chat'
  },
  {
    id: 'mac_startup',
    title: 'If your Mac doesn’t turn on or start up completely',
    productId: 'mac',
    category: 'performance',
    summary: 'Perform power diagnostics, Apple Silicon recovery mode, or reinstall macOS without data loss.',
    quickSteps: [
      'Press and hold the power button for 10 seconds until the system shuts down completely.',
      'For Apple Silicon (M1/M2/M3/M4): Press and hold power button until "Loading startup options" appears.',
      'Choose Options > Continue to run First Aid on your disk using Disk Utility.',
      'If hardware indicator light flashes amber, call Mac Hardware Helpline.'
    ],
    recommendedChannel: 'chat'
  },
  {
    id: 'airpods_connection',
    title: 'Reset your AirPods or fix charging issues',
    productId: 'airpods',
    category: 'connectivity',
    summary: 'Resolve sound distortion, firmware update delays, or one earbud not working.',
    quickSteps: [
      'Put AirPods in charging case and close lid for 30 seconds.',
      'Go to Bluetooth settings on iPhone, tap (i) next to AirPods, and tap "Forget This Device".',
      'Open case lid, press and hold setup button on back for 15 seconds until status light flashes amber, then white.',
      'Hold AirPods next to iPhone and follow on-screen instructions to reconnect.'
    ],
    recommendedChannel: 'chat'
  }
];

export const SAMPLE_COVERAGE_RECORDS: Record<string, CoverageResult> = {
  'F17K908LQP': {
    serialNumber: 'F17K908LQP',
    modelName: 'iPhone 16 Pro 256GB - Natural Titanium',
    purchaseDate: 'September 22, 2024',
    appleCareStatus: 'active',
    planName: 'AppleCare+ with Theft and Loss',
    coverageEndDate: 'September 22, 2026',
    repairsEligible: true,
    telephoneSupportEligible: true,
    expressReplacementEligible: true,
    batteryHealthEstimate: '100% Maximum Capacity (Normal Peak Performance)'
  },
  'C02G8015MD6R': {
    serialNumber: 'C02G8015MD6R',
    modelName: 'MacBook Pro 16-inch (M3 Max, 36GB, 1TB) - Space Black',
    purchaseDate: 'November 15, 2023',
    appleCareStatus: 'eligible',
    planName: 'Apple Limited Warranty (1-Year Hardware)',
    coverageEndDate: 'November 15, 2025',
    repairsEligible: true,
    telephoneSupportEligible: true,
    expressReplacementEligible: false,
    batteryHealthEstimate: '94% Normal'
  },
  'H4V5W2R9J3': {
    serialNumber: 'H4V5W2R9J3',
    modelName: 'Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium)',
    purchaseDate: 'October 12, 2023',
    appleCareStatus: 'expired',
    planName: 'Out of Warranty (Coverage Expired)',
    coverageEndDate: 'October 12, 2024',
    repairsEligible: true,
    telephoneSupportEligible: false,
    expressReplacementEligible: false,
    batteryHealthEstimate: '88% Normal'
  }
};

export const REPAIR_PRICING: RepairPriceEstimate[] = [
  {
    productId: 'iphone',
    model: 'iPhone 16 Pro Max',
    serviceType: 'Front Screen Glass Repair',
    outOfWarrantyPrice: 379,
    appleCarePrice: 29,
    estimatedTurnaround: 'Same day (2 hours at Apple Store)'
  },
  {
    productId: 'iphone',
    model: 'iPhone 16 Pro Max',
    serviceType: 'Battery Replacement',
    outOfWarrantyPrice: 119,
    appleCarePrice: 0,
    estimatedTurnaround: 'Same day (1-2 hours)'
  },
  {
    productId: 'iphone',
    model: 'iPhone 16 Pro',
    serviceType: 'Back Glass Damage',
    outOfWarrantyPrice: 169,
    appleCarePrice: 29,
    estimatedTurnaround: 'Same day'
  },
  {
    productId: 'iphone',
    model: 'iPhone 15',
    serviceType: 'Front Screen Glass Repair',
    outOfWarrantyPrice: 279,
    appleCarePrice: 29,
    estimatedTurnaround: 'Same day'
  },
  {
    productId: 'mac',
    model: 'MacBook Pro 14-inch (M3/M4)',
    serviceType: 'Liquid Retina XDR Display Replacement',
    outOfWarrantyPrice: 699,
    appleCarePrice: 99,
    estimatedTurnaround: '3 to 5 business days'
  },
  {
    productId: 'mac',
    model: 'MacBook Pro 14-inch (M3/M4)',
    serviceType: 'Battery Service',
    outOfWarrantyPrice: 249,
    appleCarePrice: 0,
    estimatedTurnaround: '1 to 2 business days'
  },
  {
    productId: 'mac',
    model: 'MacBook Air 13-inch (M2/M3)',
    serviceType: 'Display Assembly',
    outOfWarrantyPrice: 429,
    appleCarePrice: 99,
    estimatedTurnaround: '2 to 4 business days'
  },
  {
    productId: 'ipad',
    model: 'iPad Pro 13-inch (M4 Ultra Retina OLED)',
    serviceType: 'Comprehensive Device Service',
    outOfWarrantyPrice: 899,
    appleCarePrice: 49,
    estimatedTurnaround: '3 to 5 business days'
  },
  {
    productId: 'watch',
    model: 'Apple Watch Ultra 2',
    serviceType: 'Sapphire Crystal Screen Repair',
    outOfWarrantyPrice: 499,
    appleCarePrice: 79,
    estimatedTurnaround: '3 to 5 business days'
  }
];

export const SAMPLE_REPAIR_CASES: Record<string, RepairCase> = {
  'CAS-10842-8921': {
    caseId: 'CAS-10842-8921',
    serialNumber: 'F17K908LQP',
    product: 'iPhone 16 Pro 256GB Natural Titanium',
    status: 'quality_testing',
    statusDescription: 'Genuine OLED display replaced and factory calibrated. Final water-resistance seal and diagnostic sweep in progress.',
    lastUpdated: 'Today at 2:15 PM',
    estimatedCompletion: 'Today by 5:30 PM',
    serviceCenter: 'Apple Fifth Avenue Genius Bar, New York'
  },
  'CAS-77391-4402': {
    caseId: 'CAS-77391-4402',
    serialNumber: 'C02G8015MD6R',
    product: 'MacBook Pro 16-inch M3 Max Space Black',
    status: 'diagnosing',
    statusDescription: 'System received at Central Apple Care Repair Depot. Hardware engineers running thermal & logic board diagnostic loop.',
    lastUpdated: 'Yesterday at 4:30 PM',
    estimatedCompletion: 'In 2 days',
    serviceCenter: 'Apple Central Depot, Elk Grove CA'
  }
};

export const APPLE_STORES = [
  {
    id: 'store_5th_ave',
    name: 'Apple Fifth Avenue',
    city: 'New York, NY',
    address: '767 Fifth Avenue, New York, NY 10022',
    phone: '(212) 336-1440',
    hours: 'Open 24 hours a day, 365 days a year',
    nextAvailable: 'Today, 3:45 PM'
  },
  {
    id: 'store_regent_st',
    name: 'Apple Regent Street',
    city: 'London, UK',
    address: '235 Regent Street, London, W1B 2EL',
    phone: '020 7153 9000',
    hours: 'Mon-Sat 10:00 - 20:00, Sun 12:00 - 18:00',
    nextAvailable: 'Tomorrow, 11:15 AM'
  },
  {
    id: 'store_union_sq',
    name: 'Apple Union Square',
    city: 'San Francisco, CA',
    address: '300 Post Street, San Francisco, CA 94108',
    phone: '(415) 486-4800',
    hours: 'Mon-Sat 10:00 - 20:00, Sun 11:00 - 18:00',
    nextAvailable: 'Today, 5:00 PM'
  },
  {
    id: 'store_ginza',
    name: 'Apple Ginza',
    city: 'Tokyo, Japan',
    address: '8-9-7 Ginza, Chuo-ku, Tokyo 104-0061',
    phone: '03-5159-8200',
    hours: 'Daily 10:00 - 21:00',
    nextAvailable: 'Tomorrow, 2:30 PM'
  },
  {
    id: 'store_sydney',
    name: 'Apple Sydney',
    city: 'Sydney, Australia',
    address: '367 George Street, Sydney, NSW 2000',
    phone: '(02) 8084 7000',
    hours: 'Daily 9:00 - 19:00',
    nextAvailable: 'Today, 4:15 PM'
  }
];
