export interface Project {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProjectRequest {
  name: string;
  description?: string;
}
