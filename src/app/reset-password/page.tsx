import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Reset Password | Bostami Education",
  description: "Reset your Bostami Education account password securely.",
};

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex items-center justify-center">
        <ComingSoon pageName="Reset Password" />
      </main>
    </div>
  );
}
