'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ArrowLeft, Loader2, Home as HomeIcon } from 'lucide-react'
import { toast } from 'sonner' // ⭐ IMPORTAR TOAST
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateProperty, useUploadPropertyImage } from '@/hooks/useProperties'
import { useAppSelector } from '@/store/hooks'
import { createPropertySchema } from '@/utils/validators'
import { PropertyDto } from '@/types/property.types'

type CreatePropertyForm = Omit<PropertyDto, 'idProperty'>

export default function CreatePropertyPage() {
    const router = useRouter()
    const { user, isAuthenticated } = useAppSelector((state) => state.user)
    const { mutate: createProperty, isPending } = useCreateProperty()
    const { mutate: uploadImage, isPending: isUploadingImage } = useUploadPropertyImage()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CreatePropertyForm>({
        resolver: zodResolver(createPropertySchema),
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (user?.id) {
            setValue('idOwner', user.id)
        }
    }, [isAuthenticated, user, router, setValue])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = (data: CreatePropertyForm) => {
        createProperty(data, {
            onSuccess: (createdProperty) => {
                toast.success('¡Propiedad creada exitosamente!', {
                    description: `${createdProperty.name} ha sido publicada.`
                })

                // Si hay imagen, subirla
                if (selectedImage && createdProperty.idProperty) {
                    uploadImage(
                        { propertyId: createdProperty.idProperty, file: selectedImage },
                        {
                            onSuccess: () => {
                                toast.success('Imagen subida correctamente')
                                setTimeout(() => router.push('/'), 1000)
                            },
                            onError: () => {
                                toast.warning('Propiedad creada pero hubo un error al subir la imagen')
                                setTimeout(() => router.push('/'), 1000)
                            },
                        }
                    )
                } else {
                    setTimeout(() => router.push('/'), 1000)
                }
            },
            onError: (error: any) => {
                toast.error('Error al crear la propiedad', {
                    description: error.response?.data?.message || error.message
                })
            },
        })
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <Container className="py-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/properties">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Crear Nueva Propiedad</h1>
                        <p className="text-muted-foreground">
                            Completa el formulario para agregar una nueva propiedad
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Información de la Propiedad</CardTitle>
                        <CardDescription>
                            Todos los campos son obligatorios
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Imagen */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Imagen Principal</label>
                                <div className="flex items-start gap-4">
                                    {imagePreview && (
                                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            disabled={isPending || isUploadingImage}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Formatos permitidos: JPG, PNG. Máximo 5MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Nombre */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Nombre *
                                </label>
                                <Input
                                    id="name"
                                    placeholder="Ej: Casa Moderna en Poblado"
                                    {...register('name')}
                                    disabled={isPending}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Dirección */}
                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-medium">
                                    Dirección *
                                </label>
                                <Input
                                    id="address"
                                    placeholder="Ej: Calle 10 # 45-20, El Poblado"
                                    {...register('address')}
                                    disabled={isPending}
                                />
                                {errors.address && (
                                    <p className="text-sm text-destructive">{errors.address.message}</p>
                                )}
                            </div>

                            {/* Precio y Año */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="price" className="text-sm font-medium">
                                        Precio (COP) *
                                    </label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="350000000"
                                        {...register('price', { valueAsNumber: true })}
                                        disabled={isPending}
                                    />
                                    {errors.price && (
                                        <p className="text-sm text-destructive">{errors.price.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="year" className="text-sm font-medium">
                                        Año de Construcción *
                                    </label>
                                    <Input
                                        id="year"
                                        type="number"
                                        placeholder="2020"
                                        {...register('year', { valueAsNumber: true })}
                                        disabled={isPending}
                                    />
                                    {errors.year && (
                                        <p className="text-sm text-destructive">{errors.year.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Código Interno */}
                            <div className="space-y-2">
                                <label htmlFor="codeInternal" className="text-sm font-medium">
                                    Código Interno *
                                </label>
                                <Input
                                    id="codeInternal"
                                    placeholder="Ej: PROP-2024-001"
                                    {...register('codeInternal')}
                                    disabled={isPending}
                                />
                                {errors.codeInternal && (
                                    <p className="text-sm text-destructive">{errors.codeInternal.message}</p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium">
                                    Descripción *
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    placeholder="Describe la propiedad, sus características, ubicación, etc."
                                    {...register('description')}
                                    disabled={isPending}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isPending || isUploadingImage}
                                    className="flex-1"
                                >
                                    {isPending || isUploadingImage ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {isUploadingImage ? 'Subiendo imagen...' : 'Creando...'}
                                        </>
                                    ) : (
                                        <>
                                            <HomeIcon className="mr-2 h-4 w-4" />
                                            Crear Propiedad
                                        </>
                                    )}
                                </Button>
                                <Link href="/properties">
                                    <Button type="button" variant="outline" disabled={isPending}>
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