import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedBallast | The shared health supply network",
  description: "MedBallast connects suppliers, hospitals, and pharmacies in one clear operating layer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
