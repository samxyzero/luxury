import Marquee from "@/components/fx/Marquee";

interface RibbonProps {
  /** Category names, straight from the catalogue so the band never goes stale. */
  items: string[];
}

/**
 * The one loud band on the site: a saffron ribbon of everything we stock,
 * running under the hero. It does the job a list of categories would do, in a
 * fifth of the height, and gives the page its first moment of movement after
 * the curtains open.
 */
export default function Ribbon({ items }: RibbonProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label="What we stock"
      className="bg-saffron text-void border-void/10 relative z-10 border-y py-4"
    >
      <Marquee duration={55}>
        {items.map((item) => (
          <span key={item} className="mono-label flex shrink-0 items-center">
            <span className="px-6 text-[0.8rem]">{item}</span>
            {/* A diamond rather than a bullet: at mono weights a bullet nearly
                disappears against the saffron. */}
            <span aria-hidden className="text-void/40 text-[0.6rem]">
              &#9670;
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
