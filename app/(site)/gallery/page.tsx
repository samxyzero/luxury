import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import PageShell from "@/components/PageShell";
import { getGallery } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const items = await getGallery();
  const categories = Array.from(new Set(items.map((i) => i.category)));

  return pageMetadata({
    title: "Gallery",
    description: `Recent furnishing work across ${categories.join(
      ", "
    )} — bedrooms, lobbies, guest rooms and living spaces furnished by Luxury Enterprises in Pokhara, Nepal.`,
    path: "/gallery",
    image: items[0]?.image,
    keywords: [
      "furnishing gallery Pokhara",
      "hotel interior Nepal",
      "home furnishing portfolio",
    ],
  });
}

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <PageShell trail={[{ name: "Gallery", path: "/gallery" }]}>
      <Gallery items={items} as="h1" />
    </PageShell>
  );
}
