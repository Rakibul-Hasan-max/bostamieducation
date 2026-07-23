import NotFoundComponent from "@/components/ui/NotFound";
import "@/app/globals.css";

export const metadata = {
  title: "404 - Page Not Found | Bostami Education",
  description: "The page you are looking for doesn't exist.",
};

// This global not-found.tsx is required by Next.js when using route segments like [locale]
// because if a route doesn't match any locale (e.g. /unknown), it falls back here.
// Since the root layout is inside [locale], this component must include html and body tags.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col font-sans">
        <NotFoundComponent />
      </body>
    </html>
  );
}
