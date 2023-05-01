import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Roboto, Lobster_Two } from "next/font/google";
import Hydrate from "./components/Hydrate";
import Navbar from "./components/Navbar";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const lobster = Lobster_Two({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata = {
  title: "Styled Ecommerce Products",
  description: "Products taht you need.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${roboto.variable} ${lobster.variable}`}>
      <Hydrate>
        <Navbar user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
