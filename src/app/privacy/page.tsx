import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Privacy Policy | Bostami Education",
  description: "Read the Bostami Education privacy policy and data protection terms.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex items-center justify-center">
        <ComingSoon pageName="Privacy Policy" />
      </main>
    </div>
  );
}
