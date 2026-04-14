"use client";

import { Comment } from "@/lib/types";
import EmptyState from "../ui/empty-state";

export default function CommentsList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <EmptyState message="No comments yet" />;
  }

  return (
    <ul className="space-y-3">
      {comments.map((c) => (
        <li
          key={c.id}
          className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
        >
          <p className="text-sm text-gray-800">{c.text}</p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(c.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

