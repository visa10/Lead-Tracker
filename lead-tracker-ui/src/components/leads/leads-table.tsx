"use client";

import Link from "next/link";
import { Lead } from "@/lib/types";
import StatusBadge from "../ui/status-badge";

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Value</th>
            <th className="px-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <Link
                  href={`/leads/${lead.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {lead.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-500">{lead.email ?? "—"}</td>
              <td className="px-4 py-3 text-gray-500">{lead.company ?? "—"}</td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-right text-gray-500">
                {lead.value != null ? `$${lead.value.toLocaleString()}` : "—"}
              </td>
              <td className="px-4 py-3 text-gray-400">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

