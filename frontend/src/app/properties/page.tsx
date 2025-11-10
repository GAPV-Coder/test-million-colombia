'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PropertyList } from '@/features/properties/PropertyList'
import { PropertyFilters } from '@/features/properties/PropertyFilters'
import { Pagination } from '@/components/common/Pagination'
import { Container } from '@/components/layout/Container'
import { useProperties } from '@/hooks/useProperties'
import { PropertyFilters as Filters } from '@/types/property.types'
import { Spinner } from '@/components/ui/spinner'

export default function PropertiesPage() {
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState<Filters>({
        name: searchParams.get('name') || undefined,
        address: searchParams.get('address') || undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
        pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 6,
    })

    const { data, isLoading, isError, error } = useProperties(filters)

    const handleFiltersChange = (newFilters: Filters) => {
        setFilters({ ...newFilters, page: 1 })
    }

    const handleClearFilters = () => {
        setFilters({ page: 1, pageSize: filters.pageSize })
    }

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePageSizeChange = (pageSize: number) => {
        setFilters((prev) => ({ ...prev, pageSize, page: 1 }))
    }

    if (isError) {
        return (
            <Container className="py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Error al cargar propiedades</h2>
                    <p className="text-muted-foreground">{error?.message}</p>
                </div>
            </Container>
        )
    }

    return (
        <Container className="py-8">
            <div className="space-y-8">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Explora Propiedades
                    </h1>
                    <p className="text-muted-foreground">
                        {data?.total || 0} propiedades disponibles
                    </p>
                </div>

                {/* Filters */}
                <PropertyFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                />

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <Spinner className="h-12 w-12" />
                    </div>
                )}

                {/* Property List */}
                {!isLoading && <PropertyList properties={data?.items || []} />}

                {/* Pagination */}
                {data && data.total > 0 && (
                    <Pagination
                        currentPage={filters.page || 1}
                        totalPages={Math.ceil(data.total / (filters.pageSize || 6))}
                        pageSize={filters.pageSize || 6}
                        total={data.total}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                )}
            </div>
        </Container>
    )
}