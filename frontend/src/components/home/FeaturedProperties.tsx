'use client'

import { PropertyCard } from '@/features/properties/PropertyCard'
import { Button } from '@/components/ui/button'
import { useAllProperties } from '@/hooks/useProperties'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FeaturedProperties() {
    const { data, isLoading } = useAllProperties(1, 6)

    return (
        <section className="py-16 bg-muted/30">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Propiedades Destacadas
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Descubre nuestras mejores opciones disponibles
                        </p>
                    </div>
                    <Link href="/properties">
                        <Button variant="outline" className="gap-2">
                            Ver todas
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="aspect-[4/3] w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.items.map((property) => (
                            <PropertyCard key={property.idProperty} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}