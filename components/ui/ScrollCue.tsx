/**
 * Hero scroll indicator.
 *
 * A single hairline that travels the length of its own track.
 *
 * Deliberately CSS-only and a server component: returning `null` under reduced
 * motion would branch the rendered tree on a value that resolves differently on
 * the server and the client, which is a hydration mismatch. The global
 * reduced-motion block in globals.css hides it instead.
 *
 * `aria-hidden` — a hint, never the only signal that the page continues.
 */
export function ScrollCue({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="ke-scroll-cue relative h-12 w-px overflow-hidden bg-white/15">
        <span className="ke-scroll-cue-line absolute inset-x-0 top-0 block h-1/2 w-full bg-ke-blue" />
      </div>
    </div>
  );
}
