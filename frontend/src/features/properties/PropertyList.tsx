'use client'

import { PropertyCard } from './PropertyCard'
import { Skeleton } from '@/components/ui/skeleton'
import { PropertyDto } from '@/types/property.types'

interface PropertyListProps {
    properties: PropertyDto[]
    isLoading?: boolean
}

export function PropertyList({ properties, isLoading }: PropertyListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="aspect-[4/3] w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        )
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No se encontraron propiedades</p>
                <p className="text-sm text-muted-foreground mt-2">
                    Intenta ajustar tus filtros de búsqueda
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
                <PropertyCard key={property.idProperty} property={property} />
            ))}
        </div>
    )
}