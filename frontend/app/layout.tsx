
import type { Metadata } from "next";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AI Agent Hub",
  description: "Central de agentes inteligentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#090b12] text-white antialiased">
        <Sidebar />

        <div className="min-h-screen pl-64">
          <Header />

          <main className="p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
