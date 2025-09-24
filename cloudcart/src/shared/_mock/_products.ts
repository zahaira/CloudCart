import type { Product, Review } from "../types/product";
import { _mock } from "./_mock";
import { _mockCategories } from "./_categories";

export const PRODUCT_STOCK_OPTIONS = [
  { value: "in stock", label: "In stock" },
  { value: "out of stock", label: "Out of stock" },
];

const mockProductNames: Record<string, string[]> = {
  "Mobile Phones": [
    "iPhone 15 Pro",
    "Samsung Galaxy S25",
    "Xiaomi Redmi Note 14",
    "Realme Note 60x",
    "Oppo Find X6",
    "Infinix Zero 5",
    "Honor Magic5",
  ],
  "Phone Accessories": [
    "AirPods Pro",
    "Bose QuietComfort Earbuds",
    "Sony WH-1000XM5",
    "Apple Watch Series 9",
    "Samsung Galaxy Watch 6",
    "Anker PowerCore 20000",
    "Belkin Lightning Cable",
    "Nomad Leather Case",
    "Ugreen Fast Charger",
    "GoPro Hero12 Accessories",
  ],
  Tablets: [
    'iPad Pro 12.9"',
    "Samsung Galaxy Tab S9",
    "Amazon Fire HD 10",
    "Lenovo Tab P12 Pro",
    "Apple Pencil 2",
  ],
  "Landline Phones": [
    "Panasonic KX-TG7875",
    "Cisco SPA525G2",
    "Avaya J179 IP Phone",
    "VTech CS6719",
  ],
  Computers: [
    'MacBook Pro 16"',
    "Dell XPS 15",
    "HP Spectre x360",
    "Lenovo ThinkPad X1 Carbon",
    "Asus ROG Zephyrus G14",
    "Acer Predator Helios 300",
  ],
  Gaming: [
    "PlayStation 5",
    "Xbox Series X",
    "Nintendo Switch OLED",
    "Logitech G502 Mouse",
    "Razer BlackWidow V3 Keyboard",
    "Corsair Vengeance RAM",
  ],
  "Audio & Video": [
    "Sony Alpha a7 IV",
    "Canon EOS R6",
    "JBL Flip 6",
    "Bose SoundLink Revolve+",
    "Samsung QN90C TV",
    "Blue Yeti Microphone",
  ],
  "Smart Home": [
    "Google Nest Hub",
    "Amazon Echo Show 10",
    "Philips Hue Smart Lights",
    "Arlo Pro 4 Security Camera",
    "Ring Video Doorbell 4",
  ],
};

// Helpers
const getCategoryByIndex = (index: number) => {
  const activeCategories = _mockCategories.filter((c) => c.isActive);
  const cat = activeCategories[index % activeCategories.length];
  const sub = cat.subcategories[index % cat.subcategories.length];
  return { category: cat.name, subcategory: sub.name };
};

const generateReviews = (count: number, startIndex = 0): Review[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `review-${startIndex + i + 1}`,
    userId: `user-${_mock.id(startIndex + i)}`,
    userName: _mock.fullName(startIndex + i),
    comment: _mock.sentence(startIndex + i),
    rating: _mock.number.range(1, 5),
    isPurchased: true,
    date: _mock.time(startIndex + i),
  }));

const getProductName = (category: string, index: number): string => {
  const names = mockProductNames[category] || ["Product"];
  return names[index % names.length];
};

const generateStarRatings = (reviews: Review[]) => {
  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    starCounts[r.rating] = (starCounts[r.rating] || 0) + 1;
  });
  return (Object.keys(starCounts) as unknown as number[])
    .sort((a, b) => b - a)
    .map((star) => ({
      star: star as 1 | 2 | 3 | 4 | 5,
      reviewCount: starCounts[star] || 0,
    }));
};

const getImagesForCategory = (category: string, index: number): string[] => {
  const totalImages = {
    smartphone: 12,
    pc: 12,
    accessories: 7,
  };

  switch (category) {
    case "Mobile Phones":
    case "Tablets":
      return [
        _mock.image.smartphone(index % totalImages.smartphone),
        _mock.image.smartphone((index + 1) % totalImages.smartphone),
        _mock.image.smartphone((index + 2) % totalImages.smartphone),
      ];
    case "Computers":
    case "Gaming":
      return [
        _mock.image.pc(index % totalImages.pc),
        _mock.image.pc((index + 1) % totalImages.pc),
        _mock.image.pc((index + 2) % totalImages.pc),
      ];
    case "Phone Accessories":
    case "Audio & Video":
      return [
        _mock.image.accessories(index % totalImages.accessories),
        _mock.image.accessories((index + 1) % totalImages.accessories),
      ];
    default:
      return [
        "https://images.pexels.com/photos/296116/pexels-photo-296116.jpeg?auto=compress&cs=tinysrgb&w=400",
      ];
  }
};

// Generate mock products
export const _mockProducts: Product[] = Array.from({ length: 20 }).map(
  (_, i) => {
    const { category, subcategory } = getCategoryByIndex(i);

    // Decide stock coherently
    const isOutOfStock = i % 5 === 0; // every 5th product is out of stock
    const inventoryType = isOutOfStock
      ? PRODUCT_STOCK_OPTIONS[1].value
      : PRODUCT_STOCK_OPTIONS[0].value;
    const stock = isOutOfStock ? 0 : 5 + (i % 40);

    let specifications: Record<string, string | number> = {
      weight: `${1 + (i % 5)}kg`,
    };

    if (category === "Computers" || category === "Gaming") {
      specifications = {
        ...specifications,
        "Screen Size": `${13 + (i % 5)} inch`,
        Resolution: `${1080 + (i % 3) * 360}p`,
        "Processor Model": "Intel i7-12700H",
        "Hard Drive": `${256 + (i % 4) * 256}GB`,
      };
    } else if (category === "Mobile Phones" || category === "Tablets") {
      specifications = {
        ...specifications,
        "Screen Size": `${5 + (i % 8)} inch`,
        Resolution: `${720 + (i % 3) * 360}p`,
        Storage: `${32 + (i % 16) * 32}GB`,
        Battery: `${2000 + (i % 4) * 1000}mAh`,
        "Processor Model": "Snapdragon 8 Gen 3",
      };
    } else if (category === "Audio & Video") {
      specifications = {
        ...specifications,
        Power: `${5 + (i % 10) * 10}W`,
        "Battery Life": `${2 + (i % 12)}h`,
      };
    } else if (category === "Smart Home") {
      specifications = {
        ...specifications,
        Connectivity: "WiFi/Bluetooth",
        Power: `${5 + (i % 10) * 5}W`,
      };
    }
    const images = getImagesForCategory(category, i);
    const reviews = generateReviews(i % 5, i * 5);
    const rating =
      reviews.length > 0
        ? Number(
            (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          )
        : undefined;

    const starRatings = generateStarRatings(reviews);

    return {
      id: `prod-${i + 1}`,
      name: getProductName(category, i),
      price: 50 + (i % 20) * 100,
      priceSale: i % 4 === 0 ? 40 + (i % 20) * 90 : null,
      category,
      subcategory,
      tags: ["mock", "sample"],
      description: _mock.sentence(i),
      subDescription: _mock.sentence(i),
      specifications,
      coverUrl: images[0],
      images,
      rating,
      stock,
      totalSold: isOutOfStock ? 0 : 2 + (i % 40),
      ratings: starRatings,
      totalRatings: reviews.length,
      totalReviews: reviews.length,
      createdAt: _mock.time(i),
      inventoryType,
      reviews,
      saleLabel: { enabled: i % 3 === 0, content: "-20% OFF" },
      isFeatured: i % 2 === 0,
    };
  }
);
