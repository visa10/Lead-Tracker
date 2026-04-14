"use client";

import { useState } from "react";
import { addComment } from "@/lib/api";
import FormError from "../ui/form-error";

export default function AddCommentForm({
  leadId,
  onAdded,
}: {
  leadId: string;
  onAdded: () => void;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Comment cannot be empty");
      return;
    }
    if (trimmed.length > 500) {
      setError("Comment must be 500 characters or less");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addComment(leadId, trimmed);
      setText("");
      onAdded();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <FormError message={error} />
      <textarea
        placeholder="Write a comment…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        maxLength={500}
        className="input w-full"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">{text.length}/500</span>
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="btn-primary"
        >
          {loading ? "Sending…" : "Add Comment"}
        </button>
      </div>
    </form>
  );
}
