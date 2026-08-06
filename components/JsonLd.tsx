/**
 * Renders a structured-data block. Content is JSON-serialised on the server and
 * never contains user-authored HTML, so the dangerouslySetInnerHTML is safe.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
