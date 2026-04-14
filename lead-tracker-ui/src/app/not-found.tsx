import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <p className="text-6xl font-bold">404</p>
      <p className="mt-2 text-lg">Page not found</p>
      <Link href="/leads" className="btn-primary mt-6">
        ← Back to Leads
      </Link>
    </div>
  );
}

