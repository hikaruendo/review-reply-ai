// Root "/" is redirected to "/ja" via next.config.mjs redirects
// This file exists as a fallback but should not be reached
import { permanentRedirect } from "next/navigation";

export default function RootPage() {
  permanentRedirect("/ja");
}
