export interface Service {
  id: string;
  title: string;
  description: string;
  pricing: string;
  duration?: string;
  ctaText: string;
  ctaType: 'primary' | 'secondary';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredDate?: string;
  gdprConsent: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Qualification {
  degree: string;
  field: string;
}

export interface TargetGroup {
  description: string;
}