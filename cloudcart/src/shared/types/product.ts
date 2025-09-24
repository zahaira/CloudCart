export interface Review {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  date?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  priceSale: number | null;
  category: string;
  subcategory?: string;
  tags: string[];
  description?: string;
  subDescription?: string;
  specifications?: Record<string, string | number>;
  coverUrl: string;
  images?: string[];
  stock: number;
  totalSold: number;
  ratings?: {
    star: 1 | 2 | 3 | 4 | 5;
    reviewCount: number;
  }[];
  rating: number;
  totalRatings: number;
  totalReviews: number;
  createdAt: string;
  inventoryType: string;
  reviews?: Review[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  isFeatured?: boolean;
}
