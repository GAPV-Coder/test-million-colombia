import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { propertiesApi } from '@/services/properties.api';
import { QUERY_KEYS, DEFAULT_PAGE_SIZE } from '@/config/constants';
import {
    PropertyDto,
    PagedResponseDto,
    PropertyFilters,
    PropertyImageDto,
} from '@/types/property.types';

export const useProperties = (filters: PropertyFilters = {}) => {
    return useQuery<PagedResponseDto<PropertyDto>, Error>({
        queryKey: [QUERY_KEYS.PROPERTIES, filters],
        queryFn: () => propertiesApi.getAll({
            ...filters,
            pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
        }),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};

export const useAllProperties = (page = 1, pageSize = 100) => {
    return useQuery<PagedResponseDto<PropertyDto>, Error>({
        queryKey: [QUERY_KEYS.PROPERTIES, 'all', page, pageSize],
        queryFn: () => propertiesApi.getAllWithoutFilters(page, pageSize),
        staleTime: 1000 * 60 * 5,
    });
};

export const usePropertyDetail = (id: string) => {
    return useQuery<PropertyDto, Error>({
        queryKey: [QUERY_KEYS.PROPERTY_DETAIL, id],
        queryFn: () => propertiesApi.getById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};

export const usePropertyImages = (propertyId: string) => {
    return useQuery<PropertyImageDto[], Error>({
        queryKey: [QUERY_KEYS.PROPERTY_IMAGES, propertyId],
        queryFn: () => propertiesApi.getImages(propertyId),
        enabled: !!propertyId,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateProperty = () => {
    const queryClient = useQueryClient();

    return useMutation<PropertyDto, Error, Omit<PropertyDto, 'idProperty'>>({
        mutationFn: (data) => propertiesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES] });
        },
    });
};

export const useUpdateProperty = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { id: string; data: Partial<PropertyDto> }>({
        mutationFn: ({ id, data }) => propertiesApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES] });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PROPERTY_DETAIL, variables.id]
            });
        },
    });
};

export const useDeleteProperty = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id) => propertiesApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROPERTIES] });
        },
    });
};

export const useUploadPropertyImage = () => {
    const queryClient = useQueryClient();

    return useMutation<PropertyImageDto, Error, { propertyId: string; file: File }>({
        mutationFn: ({ propertyId, file }) => propertiesApi.uploadImage(propertyId, file),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PROPERTY_IMAGES, variables.propertyId]
            });
        },
    });
};