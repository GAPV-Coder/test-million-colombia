import { api } from './api';
import { API_ENDPOINTS } from '@/config/constants';
import {
    PropertyDto,
    PagedResponseDto,
    PropertyFilters,
    PropertyImageDto,
} from '@/types/property.types';

export class PropertiesApiService {
    async getAll(filters: PropertyFilters = {}): Promise<PagedResponseDto<PropertyDto>> {
        const params = new URLSearchParams();

        if (filters.name) params.append('name', filters.name);
        if (filters.address) params.append('address', filters.address);
        if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());

        const response = await api.get<PagedResponseDto<PropertyDto>>(
            `${API_ENDPOINTS.PROPERTIES}?${params.toString()}`
        );
        return response.data;
    }

    async getAllWithoutFilters(page = 1, pageSize = 100): Promise<PagedResponseDto<PropertyDto>> {
        const response = await api.get<PagedResponseDto<PropertyDto>>(
            `${API_ENDPOINTS.PROPERTIES_ALL}?page=${page}&pageSize=${pageSize}`
        );
        return response.data;
    }

    async getById(id: string): Promise<PropertyDto> {
        const response = await api.get<PropertyDto>(API_ENDPOINTS.PROPERTY_BY_ID(id));
        return response.data;
    }

    async getImages(propertyId: string): Promise<PropertyImageDto[]> {
        const response = await api.get<PropertyImageDto[]>(
            API_ENDPOINTS.PROPERTY_IMAGES(propertyId)
        );
        return response.data;
    }

    async create(data: Omit<PropertyDto, 'idProperty'>): Promise<PropertyDto> {
        const response = await api.post<PropertyDto>(API_ENDPOINTS.PROPERTIES, data);
        return response.data;
    }

    async update(id: string, data: Partial<PropertyDto>): Promise<void> {
        await api.put(`${API_ENDPOINTS.PROPERTIES}/${id}`, data);
    }

    async delete(id: string): Promise<void> {
        await api.delete(`${API_ENDPOINTS.PROPERTIES}/${id}`);
    }

    async uploadImage(propertyId: string, file: File): Promise<PropertyImageDto> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post<PropertyImageDto>(
            API_ENDPOINTS.PROPERTY_IMAGES(propertyId),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    }
}

export const propertiesApi = new PropertiesApiService();