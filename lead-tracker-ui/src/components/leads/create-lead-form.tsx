"use client";

import { useState } from "react";
import { createLead } from "@/lib/api";
import { LeadStatus } from "@/lib/types";
import FormError from "../ui/form-error";
import FormField, { statusOptions } from "../ui/form-field";

export default function CreateLeadForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<LeadStatus>(LeadStatus.NEW);
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setStatus(LeadStatus.NEW);
    setValue("");
    setNotes("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createLead({
        name: name.trim(),
        email: email.trim() || undefined,
        company: company.trim() || undefined,
        status,
        value: value ? Number(value) : undefined,
        notes: notes.trim() || undefined,
      });
      reset();
      setOpen(false);
      onCreated();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-primary">
        + New Lead
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <h3 className="mb-3 text-sm font-semibold text-gray-700">Create Lead</h3>

      <FormError message={error} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <FormField label="Name *" value={name} onChange={setName} required />
        <FormField label="Email" type="email" value={email} onChange={setEmail} />
        <FormField label="Company" value={company} onChange={setCompany} />
        <FormField label="Status" type="select" value={status} onChange={(v) => setStatus(v as LeadStatus)} options={statusOptions()} />
        <FormField label="Value" type="number" value={value} onChange={setValue} min={0} />
        <FormField label="Notes" value={notes} onChange={setNotes} />
      </div>

      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Creating…" : "Create"}
        </button>
        <button type="button" onClick={() => { reset(); setOpen(false); }} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
