import { LeadStatus } from "@/lib/types";

const colors: Record<LeadStatus, string> = {
  [LeadStatus.NEW]: "bg-blue-100 text-blue-800",
  [LeadStatus.CONTACTED]: "bg-yellow-100 text-yellow-800",
  [LeadStatus.IN_PROGRESS]: "bg-purple-100 text-purple-800",
  [LeadStatus.WON]: "bg-green-100 text-green-800",
  [LeadStatus.LOST]: "bg-red-100 text-red-800",
};

const labels: Record<LeadStatus, string> = {
  [LeadStatus.NEW]: "New",
  [LeadStatus.CONTACTED]: "Contacted",
  [LeadStatus.IN_PROGRESS]: "In Progress",
  [LeadStatus.WON]: "Won",
  [LeadStatus.LOST]: "Lost",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

