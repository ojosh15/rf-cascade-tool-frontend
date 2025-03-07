export interface Component {
    model: String;
    manufacturer: String;
    serial_no: String;
    component_type_id: String;
    num_ports: Number;
    start_freq: number;
    stop_freq: number;
    is_active: Boolean;
    is_variable: Boolean;
    description: String;
    created_at: Date;
    modified_at: Date;
    type: ComponentType;
    id: Number;
}

export interface ComponentType {
    id: Number;
    type: String;
}

export interface ComponentRow {
    id: Number;
    model: String;
    manufacturer: String;
    component_type: String;
    start_freq: Number;
    stop_freq: Number;
    is_active: Boolean;
    is_variable: Boolean;
    modified_at: Date;
}