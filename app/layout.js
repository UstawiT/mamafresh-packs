import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mamafresh-packs.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "MamaFresh Packs | Ready-to-Cook Traditional Food Packs in Nairobi",
  description:
    "Order clean, peeled, portioned, ready-to-cook traditional Kenyan foods for pregnancy, baby weaning, toddlers, and family meals. Delivered in Nairobi.",
  keywords: [
    "ready to cook food Nairobi", "baby weaning food Nairobi",
    "traditional food delivery Nairobi", "matoke delivery Nairobi",
    "peeled nduma Nairobi", "healthy food for mothers Kenya",
    "MamaFresh Packs", "meal prep for mothers Nairobi",
    "ready to cook matoke Nairobi", "baby food prep Kenya",
  ],
  openGraph: {
    title: "MamaFresh Packs | Ready-to-Cook Traditional Food in Nairobi",
    description:
      "Clean, peeled, portioned traditional Kenyan foods for busy mothers. Order on WhatsApp. Cook in minutes.",
    url: siteUrl,
    siteName: "MamaFresh Packs",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "MamaFresh Packs | Ready-to-Cook Traditional Food in Nairobi",
    description: "Healthy traditional food, prepped for busy mothers. Order on WhatsApp.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
