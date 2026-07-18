import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Terms of Service | Bostami Education",
  description: "Terms and conditions for using Bostami Education platform.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex items-center justify-center">
        <ComingSoon pageName="Terms of Service" />
      </main>
    </div>
  );
}
