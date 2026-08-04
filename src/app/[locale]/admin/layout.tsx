"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex font-sans">
      {/* Sidebar - fixed width */}
      <AdminSidebar />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen overflow-hidden">
        <AdminHeader />
        
        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
