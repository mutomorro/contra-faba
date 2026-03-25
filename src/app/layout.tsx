import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Contra Faba - Cost Consultants for the Construction Industry",
    template: "%s | Contra Faba",
  },
  description:
    "Expert cost consultants for architects, contractors and homeowners. Feasibility estimates, quantity surveying, and contract administration across London, the South East and Scotland.",
  metadataBase: new URL("https://contrafaba.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Contra Faba",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
