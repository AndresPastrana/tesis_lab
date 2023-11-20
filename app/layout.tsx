import "@/app/ui/global.css";
import Fonts from "./fonts";
import { Toaster } from "sonner";
import Footer from "./ui/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Fonts.inter.className} antialiased text-gray-700`}>
        {/* <ChangeLanguage /> */}
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
