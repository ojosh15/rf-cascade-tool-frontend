import { Component } from "@/models/component";

class ComponentService {
    private apiUrl: string;
  
    constructor() {
      this.apiUrl = 'http://localhost:5000/api/components';
    }

    // Get all components
    async getProjects(): Promise<Component[]> {
        const response = await fetch(this.apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to get projects');
        }
        return response.json();
    }
}

export default new ComponentService();