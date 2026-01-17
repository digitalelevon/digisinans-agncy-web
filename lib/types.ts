
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  status: 'draft' | 'published';
  created_at: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
}
export interface CaseStudy {
  id: string;
  title: string;
  client: string | null;
  service_category: string | null;
  result_metric: string | null;
  cover_image: string | null;
  challenge: string | null;
  solution: string | null;
  status: 'draft' | 'published';
  created_at: string;
}
