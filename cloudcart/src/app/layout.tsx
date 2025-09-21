import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/theme/theme-provider";
import Navbar from "@/shared/layouts/navbar/Navbar";

export const metadata: Metadata = {
  title: "TechMarket - Trouvez votre prochain smartphone ou ordinateur",
  description:
    "TechMarket est une plateforme e-commerce moderne et évolutive pour acheter smartphones, ordinateurs et accessoires. Parcourez, ajoutez au panier, payez en toute sécurité et suivez vos commandes facilement.",
  keywords: [
    "TechMarket",
    "e-commerce",
    "smartphone",
    "ordinateur",
    "achat en ligne",
    "plateforme e-commerce",
    "paiement sécurisé",
    "cart",
    "checkout",
  ],
  authors: [{ name: "TechMarket Team" }],
  openGraph: {
    title: "TechMarket - Votre prochain smartphone ou ordinateur",
    description:
      "Découvrez TechMarket, une plateforme e-commerce moderne et scalable pour vos smartphones, ordinateurs et accessoires.",
    url: "https://www.TechMarket.com",
    siteName: "TechMarket",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechMarket - e-commerce",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechMarket - Trouvez votre prochain smartphone ou ordinateur",
    description:
      "Achetez facilement smartphones, ordinateurs et accessoires sur TechMarket avec paiement sécurisé et suivi des commandes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
