export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  subcategories: Subcategory[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
}
