import { ZoomIn } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import GalleryLightbox from "../components/GalleryLightbox";

interface GalleryImage {
  id: number;
  src: string;
  category: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://picsum.photos/seed/gallery1/600/400",
    category: "Travel",
    alt: "Mountain vista",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/gallery2/600/400",
    category: "Nature",
    alt: "Forest path",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/gallery3/600/400",
    category: "Food",
    alt: "Colorful market",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/gallery4/600/400",
    category: "Architecture",
    alt: "City skyline",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/gallery5/600/400",
    category: "People",
    alt: "Street scene",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/gallery6/600/400",
    category: "Travel",
    alt: "Coastal cliffs",
  },
  {
    id: 7,
    src: "https://picsum.photos/seed/gallery7/600/400",
    category: "Nature",
    alt: "Waterfall",
  },
  {
    id: 8,
    src: "https://picsum.photos/seed/gallery8/600/400",
    category: "Food",
    alt: "Fine dining",
  },
  {
    id: 9,
    src: "https://picsum.photos/seed/gallery9/600/400",
    category: "Architecture",
    alt: "Ancient ruins",
  },
  {
    id: 10,
    src: "https://picsum.photos/seed/gallery10/600/400",
    category: "People",
    alt: "Festival crowd",
  },
  {
    id: 11,
    src: "https://picsum.photos/seed/gallery11/600/400",
    category: "Travel",
    alt: "Desert dunes",
  },
  {
    id: 12,
    src: "https://picsum.photos/seed/gallery12/600/400",
    category: "Nature",
    alt: "Snowy peaks",
  },
];

const categories = [
  "All",
  "Travel",
  "Nature",
  "Food",
  "Architecture",
  "People",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryImages.filter(
    (img) => activeCategory === "All" || img.category === activeCategory,
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div className="page-enter pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
            Visual Stories
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Gallery
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A curated collection of moments captured across continents — each
            frame a story waiting to be told.
          </p>
        </motion.div>

        {/* Category filter */}
        <div
          data-ocid="gallery.category.tab"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-ocid={`gallery.filter.${cat.toLowerCase()}.tab`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[oklch(var(--navy))] text-white"
                  : "bg-[oklch(var(--cream-dark))] text-foreground hover:bg-[oklch(var(--navy)/0.1)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {filtered.length === 0 ? (
          <div data-ocid="gallery.empty_state" className="text-center py-20">
            <p className="text-muted-foreground">
              No images in this category yet.
            </p>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            data-ocid="gallery.grid.section"
          >
            {filtered.map((image, i) => (
              <motion.div
                key={image.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid"
                data-ocid={`gallery.image.item.${i + 1}`}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  data-ocid={`gallery.open_modal_button.${i + 1}`}
                  className="group relative w-full overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 block"
                  aria-label={`Open ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[oklch(var(--navy-deep)/0)] group-hover:bg-[oklch(var(--navy-deep)/0.4)] transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">
                      {image.alt}
                    </p>
                    <p className="text-white/70 text-xs">{image.category}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
