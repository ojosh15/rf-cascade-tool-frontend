import { Project, ProjectCreate } from "@/models/project";

class ProjectService {
    private apiUrl: string;
  
    constructor() {
      this.apiUrl = 'http://localhost:5000/api/projects';
    }

    // Get all projects
    async getProjects(): Promise<Project[]> {
        const response = await fetch(this.apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to get projects');
        }
        return response.json();
    }

    // Create a new project
    async createProject(newProject: ProjectCreate): Promise<Project> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject),
        });
        if (!response.ok) {
            throw new Error('Failed to create project');
        }
        return response.json();
    }

    // Get a project
    async getProject(projectId: number): Promise<Project> {
        const response = await fetch(this.apiUrl + '/' + projectId, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to get project with ID: ' + projectId);
        }
        return response.json();
    }
}

export default new ProjectService();