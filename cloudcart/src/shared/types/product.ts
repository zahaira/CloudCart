export interface Review {
  id: string;
  userId: string;
  user: string;
  comment: string;
  rating: number;
  date?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  description?: string;
  pointsFort?: Record<string, string | number>; //  (ex: RAM, SSD, GPU, etc.)
  caracteristiques?: Record<string, string | number>;
  images?: string[];
  stock?: number;
  rating?: number;
  avis?: Review[];
  isFeatured?: boolean;
}
