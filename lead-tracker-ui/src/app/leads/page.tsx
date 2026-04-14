"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchLeads } from "@/lib/api";
import { Lead, LeadStatus, PaginationMeta } from "@/lib/types";
import { useDebounce } from "@/hooks/use-debounce";
import LeadFilters from "@/components/leads/lead-filters";
import LeadsTable from "@/components/leads/leads-table";
import CreateLeadForm from "@/components/leads/create-lead-form";
import Pagination from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import EmptyState from "@/components/ui/empty-state";
import ErrorMessage from "@/components/ui/error-message";

export default function LeadsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LeadsContent />
    </Suspense>
  );
}

function LeadsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "createdAt");
  const [order, setOrder] = useState(searchParams.get("order") ?? "desc");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const debouncedQ = useDebounce(q, 300);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQ) params.set("q", debouncedQ);
    if (status) params.set("status", status);
    if (sort !== "createdAt") params.set("sort", sort);
    if (order !== "desc") params.set("order", order);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(`/leads${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [debouncedQ, status, sort, order, page, router]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchLeads({
        page,
        limit: 20,
        q: debouncedQ || undefined,
        status: (status as LeadStatus) || undefined,
        sort: sort as "createdAt" | "updatedAt",
        order: order as "asc" | "desc",
      });
      setLeads(res.data);
      setMeta(res.meta);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQ, status, sort, order]);

  useEffect(() => {
    load();
  }, [load]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedQ, status, sort, order]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Leads</h1>
        <CreateLeadForm onCreated={load} />
      </div>

      <LeadFilters
        q={q}
        status={status}
        sort={sort}
        order={order}
        onQChange={setQ}
        onStatusChange={setStatus}
        onSortChange={(s, o) => {
          setSort(s);
          setOrder(o);
        }}
      />

      {loading && <Spinner />}

      {!loading && error && <ErrorMessage message={error} onRetry={load} />}

      {!loading && !error && leads.length === 0 && (
        <EmptyState message="No leads found. Create the first one!" />
      )}

      {!loading && !error && leads.length > 0 && (
        <>
          <LeadsTable leads={leads} />
          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
