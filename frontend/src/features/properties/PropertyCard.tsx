'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Calendar, Home } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Local lightweight Button component to avoid missing module error.
 * Props are intentionally untyped (any) to avoid adding extra imports for types.
 */
export const Button = ({ className, children, ...props }: any) => {
    return (
        <button
            className={cn('inline-flex items-center justify-center rounded-md', className)}
            {...props}
        >
            {children}
        </button>
    )
}

import { PropertyDto } from '@/types/property.types'
import { formatCurrency } from '@/utils/formatCurrency'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite } from '@/store/slices/propertiesSlice'
import { cn } from '@/utils/cn'

/**
 * Local lightweight Badge component to avoid missing module error.
 * Props are intentionally untyped (any) to avoid adding extra imports for types.
 */
export const Badge = ({ className, children, ...props }: any) => {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium',
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}

interface PropertyCardProps {
    property: PropertyDto
}

export function PropertyCard({ property }: PropertyCardProps) {
    const dispatch = useAppDispatch()
    const favoriteIds = useAppSelector((state) => state.properties.favoriteIds)
    const isFavorite = favoriteIds.includes(property.idProperty || '')

    const currentYear = new Date().getFullYear()
    const isNew = property.year >= currentYear - 2

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (property.idProperty) {
            dispatch(toggleFavorite(property.idProperty))
        }
    }

    const imageUrl = property.imageUrl || `https://picsum.photos/800/600?random=${property.idProperty}`

    return (
        <Link href={`/properties/${property.idProperty}`}>
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                        src={imageUrl}
                        alt={property.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Favorite Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm hover:bg-white transition-all",
                            isFavorite && "text-red-500 hover:text-red-600"
                        )}
                        onClick={handleToggleFavorite}
                    >
                        <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
                    </Button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {isNew && (
                            <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>
                        )}
                    </div>
                </div>

                <CardContent className="p-4 space-y-3">
                    {/* Price */}
                    <div className="flex items-baseline justify-between">
                        <p className="text-2xl font-bold text-primary">
                            {formatCurrency(property.price)}
                        </p>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {property.name}
                    </h3>

                    {/* Address */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{property.address}</span>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{property.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            <span className="text-xs">{property.codeInternal}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}