export interface Component {
    model: string;
    manufacturer: string;
    serial_no: string;
    component_type_id: string;
    num_ports: number;
    start_freq: number;
    stop_freq: number;
    is_active: boolean;
    is_variable: boolean;
    description: string;
    created_at: Date;
    modified_at: Date;
    type: ComponentType;
    id: number;
}

export interface ComponentType {
    id: number;
    type: string;
}

export interface XYData {
    freq: number[];
    mag: number[];
}

export interface ComponentData {
    gain: XYData;
    nf: XYData;
    p1db: XYData;
    ip2: XYData;
    ip3: XYData;
    max_input: XYData;
}

export interface ComponentVersion {
    version: number;
    change_note: string;
    is_verified: boolean;
    component_data: ComponentData;
    component_data_id: number;
    component_id: number;
    id: number;
}