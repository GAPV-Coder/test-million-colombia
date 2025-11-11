import { api } from './api'
import { PropertyTraceDto, CreatePropertyTraceDto } from '@/types/property-trace.types'

export class PropertyTraceApiService {
    async getByPropertyId(propertyId: string): Promise<PropertyTraceDto[]> {
        const response = await api.get<PropertyTraceDto[]>(`/PropertyTraces/${propertyId}`)
        return response.data
    }

    async create(data: CreatePropertyTraceDto): Promise<PropertyTraceDto> {
        const response = await api.post<PropertyTraceDto>('/PropertyTraces', data)
        return response.data
    }
}

export const propertyTraceApi = new PropertyTraceApiService()