import { Component, ComponentData } from "@/models/component";

class ComponentService {
    private apiUrl: string;
  
    constructor() {
      this.apiUrl = 'http://localhost:5000/api/components';
    }

    // Get all components
    async getComponents(): Promise<Component[]> {
        const response = await fetch(this.apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to get components');
        }
        return response.json();
    }

    // Get component data
    async getComponentData(component_id: number): Promise<ComponentData> {
        const response = await fetch(`${this.apiUrl}/${component_id}/data`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to get component data');
        }
        return response.json();
    }
}

export default new ComponentService();