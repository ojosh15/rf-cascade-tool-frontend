export interface Component {
    model: String;
    manufacturer: String;
    serial_no: String;
    component_type: String;
    num_ports: Number;
    start_freq: Number;
    stop_freq: Number;
    is_active: Boolean;
    is_variable: Boolean;
    description: String;
    created_at: Date;
    modified_at: Date;
    id: Number;
}