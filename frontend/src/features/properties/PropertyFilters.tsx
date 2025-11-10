'use client'

import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useDebounce } from '@/hooks/useDebounce'
import { PropertyFilters as Filters } from '@/types/property.types'
import { formatCurrency } from '@/utils/formatCurrency'

interface PropertyFiltersProps {
    filters: Filters
    onFiltersChange: (filters: Filters) => void
    onClearFilters: () => void
}

export function PropertyFilters({ filters, onFiltersChange, onClearFilters }: PropertyFiltersProps) {
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [localFilters, setLocalFilters] = useState<Filters>(filters)

    const debouncedFilters = useDebounce(localFilters, 500)

    // Solo llama a onFiltersChange si los filtros han cambiado realmente
    useEffect(() => {
        const isDifferent =
            JSON.stringify(debouncedFilters) !== JSON.stringify(filters)

        if (isDifferent) {
            onFiltersChange(debouncedFilters)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedFilters])

    // Sincroniza localFilters solo cuando filters del padre cambian externamente (por clear, paginación, etc.)
    useEffect(() => {
        setLocalFilters((prev) => {
            const same = JSON.stringify(prev) === JSON.stringify(filters)
            return same ? prev : filters
        })
    }, [filters])

    const handleInputChange = (key: keyof Filters, value: string | number | undefined) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }))
    }

    const hasActiveFilters =
        localFilters.name ||
        localFilters.address ||
        localFilters.minPrice ||
        localFilters.maxPrice

    return (
        <div className="space-y-4">
            {/* Main Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Name Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre..."
                                value={localFilters.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Address Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por dirección..."
                                value={localFilters.address || ''}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <Button
                            variant={showAdvanced ? 'default' : 'outline'}
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="gap-2"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filtros
                        </Button>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setLocalFilters({ page: 1, pageSize: filters.pageSize })
                                    onClearFilters()
                                }}
                                className="gap-2"
                            >
                                <X className="h-4 w-4" />
                                Limpiar
                            </Button>
                        )}
                    </div>

                    {/* Advanced Filters */}
                    {showAdvanced && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Min Price */}
                            <div>
                                <label className="text-sm font-medium mb-2 block">Precio Mínimo</label>
                                <Input
                                    type="number"
                                    placeholder="$0"
                                    value={localFilters.minPrice || ''}
                                    onChange={(e) => handleInputChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                                />
                            </div>

                            {/* Max Price */}
                            <div>
                                <label className="text-sm font-medium mb-2 block">Precio Máximo</label>
                                <Input
                                    type="number"
                                    placeholder="Sin límite"
                                    value={localFilters.maxPrice || ''}
                                    onChange={(e) => handleInputChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                    {localFilters.name && (
                        <Badge variant="secondary" className="gap-2">
                            Nombre: {localFilters.name}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleInputChange('name', undefined)}
                            />
                        </Badge>
                    )}
                    {localFilters.address && (
                        <Badge variant="secondary" className="gap-2">
                            Dirección: {localFilters.address}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleInputChange('address', undefined)}
                            />
                        </Badge>
                    )}
                    {localFilters.minPrice && (
                        <Badge variant="secondary" className="gap-2">
                            Min: {formatCurrency(localFilters.minPrice)}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleInputChange('minPrice', undefined)}
                            />
                        </Badge>
                    )}
                    {localFilters.maxPrice && (
                        <Badge variant="secondary" className="gap-2">
                            Max: {formatCurrency(localFilters.maxPrice)}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleInputChange('maxPrice', undefined)}
                            />
                        </Badge>
                    )}
                </div>
            )}
        </div>
    )
}