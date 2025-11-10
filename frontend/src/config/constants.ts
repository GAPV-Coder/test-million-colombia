export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';

export const API_ENDPOINTS = {
    PROPERTIES: '/Properties',
    PROPERTIES_ALL: '/Properties/all',
    PROPERTY_BY_ID: (id: string) => `/Properties/${id}`,
    PROPERTY_IMAGES: (propertyId: string) => `/PropertyImages/${propertyId}`,
    AUTH_REGISTER: '/Auth/register',
    AUTH_LOGIN: '/Auth/login',
    OWNERS: '/Owners',
} as const;

export const DEFAULT_PAGE_SIZE = 6;
export const MAX_PAGE_SIZE = 100;

export const QUERY_KEYS = {
    PROPERTIES: 'properties',
    PROPERTY_DETAIL: 'property-detail',
    PROPERTY_IMAGES: 'property-images',
    OWNERS: 'owners',
} as const;