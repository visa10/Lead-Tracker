"use client";

import { LeadStatus } from "@/lib/types";

interface Props {
  q: string;
  status: string;
  sort: string;
  order: string;
  onQChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onSortChange: (sort: string, order: string) => void;
}

export default function LeadFilters({
  q,
  status,
  sort,
  order,
  onQChange,
  onStatusChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search name, email, company…"
        value={q}
        onChange={(e) => onQChange(e.target.value)}
        className="input w-64"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="input"
      >
        <option value="">All statuses</option>
        {Object.values(LeadStatus).map((s) => (
          <option key={s} value={s}>
            {s.replace("_", " ")}
          </option>
        ))}
      </select>

      <select
        value={`${sort}:${order}`}
        onChange={(e) => {
          const [s, o] = e.target.value.split(":");
          onSortChange(s, o);
        }}
        className="input"
      >
        <option value="createdAt:desc">Created: new → old</option>
        <option value="createdAt:asc">Created: old → new</option>
        <option value="updatedAt:desc">Updated: new → old</option>
        <option value="updatedAt:asc">Updated: old → new</option>
      </select>
    </div>
  );
}
