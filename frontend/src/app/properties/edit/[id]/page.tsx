'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ArrowLeft, Loader2, Save, Trash2 } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { usePropertyDetail, useUpdateProperty, useDeleteProperty } from '@/hooks/useProperties'
import { useAppSelector } from '@/store/hooks'
import { updatePropertySchema } from '@/utils/validators'
import { getErrorMessage } from '@/utils/errorHandler'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface EditPropertyPageProps {
    params: Promise<{ id: string }>
}

type UpdatePropertyForm = {
    name?: string
    address?: string
    price?: number
    codeInternal?: string
    year?: number
    description?: string
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
    const { id } = use(params)
    const router = useRouter()
    const { user, isAuthenticated } = useAppSelector((state) => state.user)
    const { data: property, isLoading } = usePropertyDetail(id)
    const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty()
    const { mutate: deleteProperty, isPending: isDeleting } = useDeleteProperty()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdatePropertyForm>({
        resolver: zodResolver(updatePropertySchema),
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (property && user?.id && property.idOwner !== user.id) {
            router.push('/properties')
        }

        if (property) {
            reset({
                name: property.name,
                address: property.address,
                price: property.price,
                codeInternal: property.codeInternal,
                year: property.year,
                description: property.description,
            })
        }
    }, [property, user, isAuthenticated, router, reset])

    const onSubmit = (data: UpdatePropertyForm) => {
        setError(null)

        updateProperty(
            { id, data },
            {
                onSuccess: () => {
                    router.push(`/properties/${id}`)
                },
                onError: (error: any) => {
                    setError(getErrorMessage(error))
                },
            }
        )
    }

    const handleDelete = () => {
        deleteProperty(id, {
            onSuccess: () => {
                router.push('/properties')
            },
            onError: (error: any) => {
                setError(getErrorMessage(error))
            },
        })
    }

    if (!isAuthenticated) {
        return null
    }

    if (isLoading) {
        return (
            <Container className="py-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    <Skeleton className="h-10 w-64" />
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </Container>
        )
    }

    if (!property) {
        return (
            <Container className="py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Propiedad no encontrada</h2>
                    <Link href="/properties">
                        <Button>Volver a propiedades</Button>
                    </Link>
                </div>
            </Container>
        )
    }

    return (
        <Container className="py-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/properties/${id}`}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Editar Propiedad</h1>
                            <p className="text-muted-foreground">{property.name}</p>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" disabled={isDeleting}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. La propiedad será eliminada permanentemente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Información de la Propiedad</CardTitle>
                        <CardDescription>
                            Actualiza los campos que desees modificar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Nombre */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Nombre
                                </label>
                                <Input
                                    id="name"
                                    {...register('name')}
                                    disabled={isUpdating}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Dirección */}
                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-medium">
                                    Dirección
                                </label>
                                <Input
                                    id="address"
                                    {...register('address')}
                                    disabled={isUpdating}
                                />
                                {errors.address && (
                                    <p className="text-sm text-destructive">{errors.address.message}</p>
                                )}
                            </div>

                            {/* Precio y Año */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="price" className="text-sm font-medium">
                                        Precio (COP)
                                    </label>
                                    <Input
                                        id="price"
                                        type="number"
                                        {...register('price', { valueAsNumber: true })}
                                        disabled={isUpdating}
                                    />
                                    {errors.price && (
                                        <p className="text-sm text-destructive">{errors.price.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="year" className="text-sm font-medium">
                                        Año de Construcción
                                    </label>
                                    <Input
                                        id="year"
                                        type="number"
                                        {...register('year', { valueAsNumber: true })}
                                        disabled={isUpdating}
                                    />
                                    {errors.year && (
                                        <p className="text-sm text-destructive">{errors.year.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Código Interno */}
                            <div className="space-y-2">
                                <label htmlFor="codeInternal" className="text-sm font-medium">
                                    Código Interno
                                </label>
                                <Input
                                    id="codeInternal"
                                    {...register('codeInternal')}
                                    disabled={isUpdating}
                                />
                                {errors.codeInternal && (
                                    <p className="text-sm text-destructive">{errors.codeInternal.message}</p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    {...register('description')}
                                    disabled={isUpdating}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={isUpdating} className="flex-1">
                                    {isUpdating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Guardar Cambios
                                        </>
                                    )}
                                </Button>
                                <Link href={`/properties/${id}`}>
                                    <Button type="button" variant="outline" disabled={isUpdating}>
                                        Cancelar
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}