export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  IN_PROGRESS = "IN_PROGRESS",
  WON = "WON",
  LOST = "LOST",
}

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  status: LeadStatus;
  value: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export interface LeadDetail extends Lead {
  commentsCount: number;
  comments: Comment[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface CreateLeadPayload {
  name: string;
  email?: string;
  company?: string;
  status?: LeadStatus;
  value?: number;
  notes?: string;
}

export interface UpdateLeadPayload extends Partial<CreateLeadPayload> {}

export interface LeadQuery {
  page?: number;
  limit?: number;
  status?: LeadStatus;
  q?: string;
  sort?: "createdAt" | "updatedAt";
  order?: "asc" | "desc";
}

