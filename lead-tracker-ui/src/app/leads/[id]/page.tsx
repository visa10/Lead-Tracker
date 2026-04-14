"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchLead, fetchComments, deleteLead } from "@/lib/api";
import { LeadDetail, Comment } from "@/lib/types";
import LeadDetailCard from "@/components/leads/lead-detail-card";
import CommentsList from "@/components/leads/comments-list";
import AddCommentForm from "@/components/leads/add-comment-form";
import Spinner from "@/components/ui/spinner";
import ErrorMessage from "@/components/ui/error-message";

export default function LeadPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [leadData, commentsData] = await Promise.all([
        fetchLead(id),
        fetchComments(id),
      ]);
      setLead(leadData);
      setComments(commentsData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load lead");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const reloadComments = async () => {
    try {
      const data = await fetchComments(id);
      setComments(data);
    } catch {
      /* silently ignore, comment still shows on reload */
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;
    try {
      await deleteLead(id);
      router.push("/leads");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!lead) return <ErrorMessage message="Lead not found" backHref="/leads" />;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/leads" className="hover:text-gray-600">
          ← Leads
        </Link>
        <span>/</span>
        <span className="text-gray-600">{lead.name}</span>
      </div>

      <LeadDetailCard
        lead={lead}
        onUpdated={load}
        onDelete={handleDelete}
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold">
          Comments ({comments.length})
        </h2>
        <CommentsList comments={comments} />
        <AddCommentForm leadId={lead.id} onAdded={reloadComments} />
      </section>
    </div>
  );
}

