export interface Project {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  modified_at: Date;
}

export interface ProjectCreate {
  name: string;
  description?: string;
}

export interface ProjectUpdate {
  name?: string;
  description?: string;
}