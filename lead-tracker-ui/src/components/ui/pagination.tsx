import { PaginationMeta } from "@/lib/types";

export default function Pagination({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm">
      <p className="text-gray-500">
        Total: <span className="font-medium">{meta.total}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
          className="btn-page"
        >
          ← Prev
        </button>
        <span className="text-gray-600">
          {meta.page} / {meta.totalPages || 1}
        </span>
        <button
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPageChange(meta.page + 1)}
          className="btn-page"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

