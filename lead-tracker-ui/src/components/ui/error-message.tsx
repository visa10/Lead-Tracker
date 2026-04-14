import Link from "next/link";

export default function ErrorMessage({
  message,
  onRetry,
  backHref,
}: {
  message: string;
  onRetry?: () => void;
  backHref?: string;
}) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <p>{message}</p>
      <div className="mt-2 flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium text-red-800 underline hover:no-underline"
          >
            Try again
          </button>
        )}
        {backHref && (
          <Link href={backHref} className="text-sm font-medium text-red-800 underline hover:no-underline">
            ← Go back
          </Link>
        )}
      </div>
    </div>
  );
}

