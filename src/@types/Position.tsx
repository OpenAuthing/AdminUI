export interface Position {
    id: string;
    name: string;
    description?: string;
}

export interface CreatePositionModel {
    name: string;
    description?: string;
}
