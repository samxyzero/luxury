interface MapEmbedProps {
  embedUrl: string;
  title: string;
}

export default function MapEmbed({ embedUrl, title }: MapEmbedProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full sm:h-full sm:min-h-[320px] grayscale-[15%]"
      />
    </div>
  );
}
