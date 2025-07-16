// types.ts
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum Architecture {
  MONOLITHIC = "MONOLITHIC",
  MICROSERVICES = "MICROSERVICES",
}

export enum InquiryStatus {
  pending = "pending",
  responded = "responded",
  closed = "closed",
}

export enum Category {
  Web_Application_Development = "Web_Application_Development",
  Mobile_Application_Development = "Mobile_Application_Development",
  AI_Powered_Solutions = "AI_Powered_Solutions",
  Website_Translation_and_Localization_n8n = "Website_Translation_and_Localization_n8n",
  E_Commerce_and_Payment_Integration = "E_Commerce_and_Payment_Integration",
  Cloud_and_DevOps_Solutions = "Cloud_and_DevOps_Solutions",
  UIUX_Design_and_Prototyping = "UIUX_Design_and_Prototyping",
  Database_Design_and_Management = "Database_Design_and_Management",
  API_Development_and_Integration = "API_Development_and_Integration",
  Performance_Optimization_and_SEO = "Performance_Optimization_and_SEO",
}

// Core Types
export type User = {
  id: string;
  name: string;
  email: string;
  role?: Role;
  hashedPassword: string;
  hashedRt?: string;
  createdAt: string;
  updatedAt: string;
  projects: Projects[];
  inquiries: Inquiry[];
  services: Services[];
};

export enum Status {
  LIVE = "LIVE",
  DEVELOPMENT = "DEVELOPMENT",
  COMPLETED = "COMPLETED",
  HOLD = "HOLD",
  CANCELLED = "CANCELLED",
}

export interface Project {
  category: any;
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  architecture: string;

  categories: Array<{ id: string; name: string }>;
  stacks: string;
  status: Status;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  bgcover_src: string | null;
  createdAt: string;
  updatedAt: string;
}

export type Services = {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category: Category;
  price_per_hour: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  _count: {
    inquiries: number;
  };
  inquiries: Inquiry[];
};

export type Inquiry = {
  id: string;
  clientName?: string;
  clientEmail: string;
  clientCompany?: string;
  serviceId?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  service: {
    title: string;
    category: string;
    price_per_hour: string;
  };
};

// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   liveUrl: string;
//   githubUrl: string;
//   status: "LIVE" | "IN_DEVELOPMENT" | "COMPLETED";
//   stacks: string;
//   featured: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Service {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   price_per_hour: string;
//   createdAt: string;
//   updatedAt: string;
//   _count?: { inquiries: number };
//   inquiries?: number;
// }

// interface Inquiry {
//   id: string;
//   clientName: string;
//   clientEmail: string;
//   clientCompany: string;
//   message: string;
//   status: "pending" | "resolved" | "in_progress";
//   createdAt: string;
//   updatedAt: string;
//   service: {
//     title: string;
//     category: string;
//     price_per_hour: string;
//   };
// }

interface Newsletter {
  id: string;
  email: string;
  source: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
