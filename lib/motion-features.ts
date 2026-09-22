/**
 * Framer Motion's full feature bundle — animations, gestures, drag and LAYOUT.
 *
 * The app runs on `domAnimation`, which has no layout projection, so `layoutId`
 * does nothing by default. The athlete profile morph needs it, and only that
 * component does, so it loads this file on demand:
 *
 *   <LazyMotion features={() => import("@/lib/motion-features").then((m) => m.default)}>
 *
 * Kept as its own module so the bundler can split it into a separate chunk
 * instead of adding layout projection to every page.
 */
import { domMax } from "framer-motion";

export default domMax;
