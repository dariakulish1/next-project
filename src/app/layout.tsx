import type { Metadata } from "next";
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const robotoFont = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CreateIt",
  description: "Descrion of the CreateIt application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoFont.className}>
        <AuthProvider>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
