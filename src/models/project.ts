export interface Project {
  id: Number;
  name: String;
  description?: String;
  created_at: Date;
  modified_at: Date;
}

export interface ProjectCreate {
  name: String;
  description?: String;
}

export interface ProjectUpdate {
  name?: String;
  description?: String;
}