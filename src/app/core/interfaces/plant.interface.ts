export interface Plant {
    address: string
    country: string
    division: string
    id: number
    name: string
}

export interface FullPlant extends Plant {
    city: string;
    default_language: string;
    description: string;
    manager: string;
    phone: string;
}