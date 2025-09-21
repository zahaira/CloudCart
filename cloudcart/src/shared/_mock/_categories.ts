import type { Category, Subcategory } from "../types/categories";
import dayjs from "dayjs";
import { _mock } from "./_mock";

// Category status options for admin panel
export const CATEGORY_STATUS_OPTIONS = [
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
];

// Predefined category data
const categoryNames = [
  "Mobile Phones",
  "Phone Accessories",
  "Tablets",
  "Landline Phones",
  "Best Brands",
  "Best Smartphones",
  "Computers",
  "Gaming",
  "Audio & Video",
  "Smart Home",
];

const subcategoryData: Record<string, string[]> = {
  "Mobile Phones": [
    "Android Phones",
    "iPhones",
    "Basic Phones",
    "Refurbished Phones",
  ],
  "Phone Accessories": [
    "Bluetooth Headphones",
    "Smart Watches",
    "Portable Speakers",
    "Chargers",
    "Cables",
    "Powerbanks",
    "Photo & Video Accessories",
    "Car Accessories",
    "Screen Protectors",
    "Cases & Covers",
    "Memory Cards",
  ],
  Tablets: ["iPad", "Android Tablets", "Tablet Accessories", "E-readers"],
  "Landline Phones": [
    "Wireless Phones",
    "Wired Phones",
    "VoIP Phones",
    "Business Phones",
  ],
  "Best Brands": [
    "Samsung",
    "Xiaomi",
    "Oppo",
    "Honor",
    "Infinix",
    "Apple",
    "OnePlus",
  ],
  "Best Smartphones": [
    "Samsung Galaxy S25",
    "iPhone 16",
    "Xiaomi Redmi A3X",
    "Realme Note 60x",
    "Xiaomi Redmi Note 14",
    "Xiaomi Poco X6 Pro",
  ],
  Computers: [
    "Laptops",
    "Desktop PCs",
    "Components",
    "Monitors",
    "Keyboards & Mice",
  ],
  Gaming: ["Gaming Laptops", "Gaming Consoles", "Gaming Accessories", "Games"],
  "Audio & Video": [
    "Headphones",
    "Speakers",
    "Cameras",
    "Microphones",
    "TV Accessories",
  ],
  "Smart Home": [
    "Smart Speakers",
    "Security Cameras",
    "Smart Lights",
    "Home Automation",
  ],
};

// Helper function to create slug from name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

// Generate subcategories for each category
const generateSubcategories = (
  categoryId: string,
  categoryIndex: number
): Subcategory[] => {
  const categoryName = categoryNames[categoryIndex];
  const subs = subcategoryData[categoryName] || [];

  return subs.map((subName, subIndex) => {
    const globalIndex = categoryIndex * 10 + subIndex;
    const createdDate = _mock.time(globalIndex);
    const updatedDate = _mock.time(globalIndex + 1);

    return {
      id: `${categoryId}-sub-${subIndex + 1}`,
      name: subName,
      slug: createSlug(subName),
      categoryId: categoryId,
      description: _mock.sentence(globalIndex),
      isActive: _mock.boolean(globalIndex),
      createdAt: createdDate,
      updatedAt: updatedDate,
      sortOrder: subIndex + 1,
    };
  });
};

// Generate main categories
export const _mockCategories: Category[] = categoryNames.map((name, index) => {
  const categoryId = `cat-${index + 1}`;
  const subcategories = generateSubcategories(categoryId, index);
  const createdDate = _mock.time(index);

  return {
    id: categoryId,
    name: name,
    slug: createSlug(name),
    description: `Discover our selection of ${name.toLowerCase()} with the best prices and fast delivery.`,
    isActive: index % 4 !== 3, // 75% des catégories sont actives
    subcategories: subcategories,
    metaTitle: `${name} - Best Deals Online | TechShop`,
    metaDescription: `Shop quality ${name.toLowerCase()} with free delivery. Wide selection, competitive prices and 5-star customer service.`,
    createdAt: createdDate,
    updatedAt: dayjs(createdDate)
      .add(_mock.number.nativeS(index), "day")
      .toISOString(),
    sortOrder: index + 1,
  };
});

// Flattened subcategories list
export const _mockSubcategories: Subcategory[] = _mockCategories.flatMap(
  (cat) => cat.subcategories
);

// Mock category stats for dashboard
export const _mockCategoryStats = {
  totalCategories: _mockCategories.length,
  activeCategories: _mockCategories.filter((cat) => cat.isActive).length,
  inactiveCategories: _mockCategories.filter((cat) => !cat.isActive).length,
  totalSubcategories: _mockSubcategories.length,
  activeSubcategories: _mockSubcategories.filter((sub) => sub.isActive).length,
};

// Popular categories (for homepage) - active categories with most subcategories
export const _mockPopularCategories = _mockCategories
  .filter((cat) => cat.isActive)
  .sort((a, b) => b.subcategories.length - a.subcategories.length)
  .slice(0, 6);

// Recently added categories
export const _mockRecentCategories = _mockCategories
  .sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  .slice(0, 5);

// Categories tree structure (for navigation)
export const _mockCategoryTree = _mockCategories
  .filter((cat) => cat.isActive)
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    children: category.subcategories
      .filter((sub) => sub.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
      })),
  }));

// Mock API responses
export const _mockCategoryResponses = {
  // GET /api/categories
  getAllCategories: {
    success: true,
    data: _mockCategories,
    total: _mockCategories.length,
    page: 1,
    limit: 20,
    timestamp: new Date().toISOString(),
  },

  // GET /api/categories/active
  getActiveCategories: {
    success: true,
    data: _mockCategories.filter((cat) => cat.isActive),
    total: _mockCategories.filter((cat) => cat.isActive).length,
  },

  // GET /api/categories/stats
  getCategoryStats: {
    success: true,
    data: _mockCategoryStats,
  },

  // GET /api/categories/popular
  getPopularCategories: {
    success: true,
    data: _mockPopularCategories,
  },

  // GET /api/categories/tree
  getCategoryTree: {
    success: true,
    data: _mockCategoryTree,
  },
};

// Helper functions for testing and development
export const getCategoryById = (id: string): Category | undefined => {
  return _mockCategories.find((cat) => cat.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return _mockCategories.find((cat) => cat.slug === slug);
};

export const getSubcategoryById = (id: string): Subcategory | undefined => {
  return _mockSubcategories.find((sub) => sub.id === id);
};

export const getSubcategoryBySlug = (
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug);
};

export const searchCategories = (query: string): Category[] => {
  const searchTerm = query.toLowerCase();
  return _mockCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm) ||
      category.subcategories.some(
        (sub) =>
          sub.name.toLowerCase().includes(searchTerm) ||
          (sub.description &&
            sub.description.toLowerCase().includes(searchTerm))
      )
  );
};

// Filter categories by status
export const getActiveCategories = (): Category[] => {
  return _mockCategories.filter((cat) => cat.isActive);
};

export const getInactiveCategories = (): Category[] => {
  return _mockCategories.filter((cat) => !cat.isActive);
};

// Get categories with active subcategories only
export const getCategoriesWithActiveSubcategories = (): Category[] => {
  return _mockCategories.map((category) => ({
    ...category,
    subcategories: category.subcategories.filter((sub) => sub.isActive),
  }));
};
