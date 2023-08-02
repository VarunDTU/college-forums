import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/search/navbar";
import Footer from "./footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "College Forums",
  description: "Get the discussion going",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
