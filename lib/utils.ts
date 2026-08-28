type ClassValue = string | false | null | undefined;

/** Minimal class joiner. Kept dependency-free — class conflicts are avoided by
 *  construction rather than resolved at runtime. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
