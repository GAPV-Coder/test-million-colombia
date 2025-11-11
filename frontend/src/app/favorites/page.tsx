'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Heart, Home as HomeIcon } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { PropertyCard } from '@/features/properties/PropertyCard'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
import { useAllProperties } from '@/hooks/useProperties'
import { Skeleton } from '@/components/ui/skeleton'

export default function FavoritesPage() {
    const favoriteIds = useAppSelector((state) => state.properties.favoriteIds)
    const { data, isLoading } = useAllProperties(1, 100)

    const favoriteProperties = useMemo(() => {
        if (!data?.items) return []
        return data.items.filter((property) =>
            favoriteIds.includes(property.idProperty || '')
        )
    }, [data, favoriteIds])

    return (
        <Container className="py-12">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mis Favoritos</h1>
                        <p className="text-muted-foreground">
                            {favoriteProperties.length} {favoriteProperties.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="aspect-[4/3] w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && favoriteProperties.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                            <Heart className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">No tienes favoritos</h2>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Comienza a guardar tus propiedades favoritas haciendo click en el corazón para encontrarlas fácilmente más tarde
                        </p>
                        <Link href="/properties">
                            <Button size="lg" className="gap-2">
                                <HomeIcon className="h-4 w-4" />
                                Explorar Propiedades
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Properties Grid */}
                {!isLoading && favoriteProperties.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteProperties.map((property) => (
                            <PropertyCard key={property.idProperty} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    )
}