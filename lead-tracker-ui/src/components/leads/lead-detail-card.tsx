"use client";

import { useState } from "react";
import { LeadDetail, LeadStatus } from "@/lib/types";
import { updateLead } from "@/lib/api";
import StatusBadge from "../ui/status-badge";
import FormError from "../ui/form-error";
import FormField, { statusOptions } from "../ui/form-field";
import DisplayField from "../ui/display-field";

export default function LeadDetailCard({
  lead,
  onUpdated,
  onDelete,
}: {
  lead: LeadDetail;
  onUpdated: () => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email ?? "");
  const [company, setCompany] = useState(lead.company ?? "");
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [value, setValue] = useState(lead.value != null ? String(lead.value) : "");
  const [notes, setNotes] = useState(lead.notes ?? "");

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateLead(lead.id, {
        name: name.trim(),
        email: email.trim() || undefined,
        company: company.trim() || undefined,
        status,
        value: value ? Number(value) : undefined,
        notes: notes.trim() || undefined,
      });
      setEditing(false);
      onUpdated();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(lead.name);
    setEmail(lead.email ?? "");
    setCompany(lead.company ?? "");
    setStatus(lead.status);
    setValue(lead.value != null ? String(lead.value) : "");
    setNotes(lead.notes ?? "");
    setError("");
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
            <p className="mt-1 text-sm text-gray-400">
              Created {new Date(lead.createdAt).toLocaleString()} · Updated{" "}
              {new Date(lead.updatedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <DisplayField label="Email" value={lead.email ?? "—"} />
          <DisplayField label="Company" value={lead.company ?? "—"} />
          <DisplayField label="Status">
            <StatusBadge status={lead.status} />
          </DisplayField>
          <DisplayField label="Value" value={lead.value != null ? `$${lead.value.toLocaleString()}` : "—"} />
          <DisplayField label="Comments" value={String(lead.commentsCount)} />
        </div>

        {lead.notes && (
          <div className="mt-4">
            <DisplayField label="Notes">
              <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
            </DisplayField>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Edit Lead</h2>

      <FormError message={error} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField label="Name *" value={name} onChange={setName} required />
        <FormField label="Email" type="email" value={email} onChange={setEmail} />
        <FormField label="Company" value={company} onChange={setCompany} />
        <FormField label="Status" type="select" value={status} onChange={(v) => setStatus(v as LeadStatus)} options={statusOptions()} />
        <FormField label="Value" type="number" value={value} onChange={setValue} min={0} />
        <FormField label="Notes" type="textarea" value={notes} onChange={setNotes} maxLength={2000} className="sm:col-span-2" />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={handleSave} disabled={loading} className="btn-primary">
          {loading ? "Saving…" : "Save"}
        </button>
        <button onClick={handleCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
}

