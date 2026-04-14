import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lead Tracker",
  description: "Mini CRM for managing leads",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-6xl justify-between px-4 py-3">
            <Link href="/leads" className="text-lg font-bold text-blue-600">
              Lead Tracker
            </Link>
            <nav>
              <Link href="/leads" className="text-sm text-gray-600 hover:text-gray-900">
                Leads
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
