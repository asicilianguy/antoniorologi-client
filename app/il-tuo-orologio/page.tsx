/**
 * Thin server-component wrapper.
 * BuilderClient is loaded with ssr:false so Math.random() in useState is safe —
 * the component never runs server-side, so there is no hydration mismatch.
 * This also means ClockCanvas is mounted ONCE with a valid imageLink from the
 * very first render, eliminating the empty→valid imageLink transition bug.
 */
import dynamic from "next/dynamic";

const BuilderClient = dynamic(
  () => import("./BuilderClient"),
  { ssr: false }
);

export default function Page() {
  return <BuilderClient />;
}
