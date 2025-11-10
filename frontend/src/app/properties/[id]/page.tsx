'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Home, ArrowLeft, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/layout/Container'
import { usePropertyDetail } from '@/hooks/useProperties'
import { formatCurrency } from '@/utils/formatCurrency'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite } from '@/store/slices/propertiesSlice'
import { cn } from '@/utils/cn'

interface PropertyDetailPageProps {
    params: Promise<{ id: string }>
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
    const { id } = use(params)
    const dispatch = useAppDispatch()
    const { data: property, isLoading, isError } = usePropertyDetail(id)
    const favoriteIds = useAppSelector((state) => state.properties.favoriteIds)
    const isFavorite = property ? favoriteIds.includes(property.idProperty || '') : false
    const imageUrl = property?.imageUrl || `https://picsum.photos/1200/800?random=${property?.idProperty}`


    const handleToggleFavorite = () => {
        if (property?.idProperty) {
            dispatch(toggleFavorite(property.idProperty))
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: property?.name,
                    text: property?.description,
                    url: window.location.href,
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copiado al portapapeles')
        }
    }

    if (isLoading) {
        return (
            <Container className="py-8">
                <div className="space-y-8">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="aspect-video w-full" />
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <Skeleton className="h-64" />
                    </div>
                </div>
            </Container>
        )
    }

    if (isError || !property) {
        return (
            <Container className="py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Propiedad no encontrada</h2>
                    <p className="text-muted-foreground mb-6">
                        La propiedad que buscas no existe o ha sido removida
                    </p>
                    <Link href="/properties">
                        <Button>Ver todas las propiedades</Button>
                    </Link>
                </div>
            </Container>
        )
    }

    const currentYear = new Date().getFullYear()
    const isNew = property.year >= currentYear - 2

    return (
        <Container className="py-8">
            <div className="space-y-8">
                {/* Back Button */}
                <Link href="/properties">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Volver a propiedades
                    </Button>
                </Link>

                {/* Image Gallery */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <Image
                        src={imageUrl}
                        alt={property.name}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {isNew && (
                            <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>
                        )}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Title & Price */}
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                <MapPin className="h-5 w-5" />
                                <span>{property.address}</span>
                            </div>
                            <p className="text-3xl font-bold text-primary">
                                {formatCurrency(property.price)}
                            </p>
                        </div>

                        {/* Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Detalles de la Propiedad</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Año</p>
                                        <p className="font-medium">{property.year}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Home className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Código</p>
                                        <p className="font-medium">{property.codeInternal}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Descripción</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {property.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <Button className="w-full" size="lg">
                                    Contactar Agente
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full gap-2"
                                    onClick={handleToggleFavorite}
                                >
                                    <Heart className={cn("h-4 w-4", isFavorite && "fill-current text-red-500")} />
                                    {isFavorite ? 'Guardado' : 'Guardar'}
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full gap-2"
                                    onClick={handleShare}
                                >
                                    <Share2 className="h-4 w-4" />
                                    Compartir
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <p className="text-muted-foreground">
                                    ¿Interesado en esta propiedad? Contáctanos para más información.
                                </p>
                                <div className="space-y-2">
                                    <p className="font-medium">Email:</p>
                                    <p className="text-muted-foreground">contacto@millionhomes.com</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-medium">Teléfono:</p>
                                    <p className="text-muted-foreground">+57 300 123 4567</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Container>
    )
}