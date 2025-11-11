import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { propertyTraceApi } from '@/services/property-trace.api'
import { PropertyTraceDto, CreatePropertyTraceDto } from '@/types/property-trace.types'

export const usePropertyTrace = (propertyId: string) => {
    return useQuery<PropertyTraceDto[], Error>({
        queryKey: ['property-trace', propertyId],
        queryFn: () => propertyTraceApi.getByPropertyId(propertyId),
        enabled: !!propertyId,
        staleTime: 1000 * 60 * 5,
    })
}

export const useCreatePropertyTrace = () => {
    const queryClient = useQueryClient()

    return useMutation<PropertyTraceDto, Error, CreatePropertyTraceDto>({
        mutationFn: (data) => propertyTraceApi.create(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['property-trace', data.idProperty]
            })
        },
    })
}