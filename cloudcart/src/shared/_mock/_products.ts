import type { Product, Review } from "../types/product";
import { _mock } from "./_mock";
import { _mockCategories } from "./_categories";

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
// Helper to get a category & subcategory based on index
const getCategoryByIndex = (
  index: number
): { category: string; subcategory: string } => {
  const activeCategories = _mockCategories.filter((c) => c.isActive);
  const cat = activeCategories[index % activeCategories.length];
  const sub = cat.subcategories[index % cat.subcategories.length];
  return { category: cat.name, subcategory: sub.name };
};

// Generate mock reviews deterministically
const generateReviews = (count: number, startIndex = 0): Review[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `review-${startIndex + i + 1}`,
    userId: `user-${_mock.id(startIndex + i)}`,
    user: _mock.fullName(startIndex + i),
    comment: _mock.sentence(startIndex + i),
    rating: _mock.number.range(1, 5),
    date: _mock.time(startIndex + i),
  }));

// Helper to get a product name deterministically
const getProductName = (category: string, index: number): string => {
  const names = mockProductNames[category] || ["Product"];
  return names[index % names.length];
};

// Helper to get images deterministically
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

// Generate deterministic mock products
export const _mockProducts: Product[] = Array.from({ length: 20 }).map(
  (_, i) => {
    const { category, subcategory } = getCategoryByIndex(i);

    const pointsFort =
      category === "Computers" || category === "Gaming"
        ? {
            RAM: `${8 + (i % 4) * 8}GB`,
            SSD: `${256 + (i % 4) * 256}GB`,
            CPU: "Intel i7",
          }
        : undefined;

    let caracteristiques: Record<string, string | number> = {
      weight: `${1 + (i % 5)}kg`,
    };

    if (category === "Computers" || category === "Gaming") {
      caracteristiques = {
        ...caracteristiques,
        "Screen Size": `${13 + (i % 5)} inch`,
        Resolution: `${1080 + (i % 3) * 360}p`,
        "Processor Model": "Intel i7-12700H",
        "Hard Drive": `${256 + (i % 4) * 256}GB`,
      };
    } else if (category === "Mobile Phones" || category === "Tablets") {
      caracteristiques = {
        ...caracteristiques,
        "Screen Size": `${5 + (i % 8)} inch`,
        Resolution: `${720 + (i % 3) * 360}p`,
        Storage: `${32 + (i % 16) * 32}GB`,
        Battery: `${2000 + (i % 4) * 1000}mAh`,
        "Processor Model": "Snapdragon 8 Gen 3",
      };
    } else if (category === "Audio & Video") {
      caracteristiques = {
        ...caracteristiques,
        Power: `${5 + (i % 10) * 10}W`,
        "Battery Life": `${2 + (i % 12)}h`,
      };
    } else if (category === "Smart Home") {
      caracteristiques = {
        ...caracteristiques,
        Connectivity: "WiFi/Bluetooth",
        Power: `${5 + (i % 10) * 5}W`,
      };
    }

    const images = getImagesForCategory(category, i);
    const avis = generateReviews(i % 5, i * 5);
    const rating = avis.length
      ? Number(
          (avis.reduce((sum, r) => sum + r.rating, 0) / avis.length).toFixed(1)
        )
      : undefined;

    return {
      id: `prod-${i + 1}`,
      name: getProductName(category, i),
      price: 50 + (i % 20) * 100,
      category,
      subcategory,
      description: _mock.sentence(i),
      pointsFort,
      caracteristiques,
      images,
      stock: 10 + (i % 40),
      rating,
      avis,
      isFeatured: i % 3 === 0,
    };
  }
);
