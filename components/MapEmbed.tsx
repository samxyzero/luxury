interface MapEmbedProps {
  embedUrl: string;
  title: string;
}

export default function MapEmbed({ embedUrl, title }: MapEmbedProps) {
  return (
    <div className="border border-stone-on-navy">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full grayscale-[20%] sm:h-72"
      />
    </div>
  );
}
