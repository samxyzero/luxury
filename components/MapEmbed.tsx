interface MapEmbedProps {
  embedUrl: string;
  title: string;
}

/**
 * Google's map arrives in Google's colours, which are nothing like this site's.
 * Inverting and re-rotating the hue lands it close to the page's near-black
 * without needing a paid styled-map key, and a warm multiply overlay pulls the
 * remaining greens back toward the palette.
 */
export default function MapEmbed({ embedUrl, title }: MapEmbedProps) {
  return (
    <div className="border-smoke relative overflow-hidden rounded-[1.5rem] border">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.5)_contrast(0.9)] sm:h-72"
      />
      <div
        aria-hidden
        className="bg-saffron/8 pointer-events-none absolute inset-0 mix-blend-multiply"
      />
    </div>
  );
}
