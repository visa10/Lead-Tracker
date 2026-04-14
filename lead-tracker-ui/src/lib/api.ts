import {
  Lead,
  LeadDetail,
  Comment,
  PaginatedResponse,
  CreateLeadPayload,
  UpdateLeadPayload,
  LeadQuery,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? `Error ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export function fetchLeads(query: LeadQuery = {}) {
  const params = new URLSearchParams();
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.status) params.set("status", query.status);
  if (query.q) params.set("q", query.q);
  if (query.sort) params.set("sort", query.sort);
  if (query.order) params.set("order", query.order);
  const qs = params.toString();
  return request<PaginatedResponse<Lead>>(`/leads${qs ? `?${qs}` : ""}`);
}

export function fetchLead(id: string) {
  return request<LeadDetail>(`/leads/${id}`);
}

export function createLead(data: CreateLeadPayload) {
  return request<Lead>("/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateLead(id: string, data: UpdateLeadPayload) {
  return request<Lead>(`/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteLead(id: string) {
  return request<void>(`/leads/${id}`, { method: "DELETE" });
}

export function fetchComments(leadId: string) {
  return request<Comment[]>(`/leads/${leadId}/comments`);
}

export function addComment(leadId: string, text: string) {
  return request<Comment>(`/leads/${leadId}/comments`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export { ApiError };

