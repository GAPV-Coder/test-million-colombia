export interface PropertyDto {
    idProperty?: string;
    name: string;
    address: string;
    price: number;
    codeInternal: string;
    year: number;
    description: string;
    idOwner: string;
    imageUrl?: string;
}

export interface PropertyImageDto {
    idPropertyImage?: string;
    idProperty: string;
    file: string;
    enabled: boolean;
}

export interface OwnerDto {
    idOwner?: string;
    name: string;
    address: string;
    photo?: string;
    birthday: Date;
}

export interface PagedResponseDto<T> {
    items: T[];
    page: number;
    pageSize: number;
    total: number;
}

export interface PropertyFilters {
    name?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
}