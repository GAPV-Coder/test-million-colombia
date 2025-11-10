import { PropertyDto } from '@/types/property.types';

export const getPropertyAge = (year: number): number => {
    return new Date().getFullYear() - year;
};

export const isNewProperty = (year: number): boolean => {
    return getPropertyAge(year) <= 2;
};

export const sortProperties = (
    properties: PropertyDto[],
    sortBy: 'name' | 'price-asc' | 'price-desc' | 'year'
): PropertyDto[] => {
    const sorted = [...properties];

    switch (sortBy) {
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'year':
            return sorted.sort((a, b) => b.year - a.year);
        default:
            return sorted;
    }
};

export const filterPropertiesBySearch = (
    properties: PropertyDto[],
    searchTerm: string
): PropertyDto[] => {
    if (!searchTerm) return properties;

    const term = searchTerm.toLowerCase();
    return properties.filter(
        (property) =>
            property.name.toLowerCase().includes(term) ||
            property.address.toLowerCase().includes(term) ||
            property.description.toLowerCase().includes(term)
    );
};