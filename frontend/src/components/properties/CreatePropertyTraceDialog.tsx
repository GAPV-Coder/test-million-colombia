'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Loader2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreatePropertyTrace } from '@/hooks/usePropertyTrace'
import { getErrorMessage } from '@/utils/errorHandler'

const createTraceSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    value: z.number().min(1, 'El valor debe ser mayor a 0'),
    tax: z.number().min(0, 'El impuesto debe ser mayor o igual a 0'),
    dateSale: z.string().min(1, 'La fecha es requerida'),
})

type CreateTraceForm = z.infer<typeof createTraceSchema>

interface CreatePropertyTraceDialogProps {
    propertyId: string
}

export function CreatePropertyTraceDialog({ propertyId }: CreatePropertyTraceDialogProps) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { mutate: createTrace, isPending } = useCreatePropertyTrace()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateTraceForm>({
        resolver: zodResolver(createTraceSchema),
    })

    const onSubmit = (data: CreateTraceForm) => {
        setError(null)

        createTrace(
            {
                idProperty: propertyId,
                name: data.name,
                value: data.value,
                tax: data.tax,
                dateSale: new Date(data.dateSale),
            },
            {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                },
                onError: (error: any) => {
                    setError(getErrorMessage(error))
                },
            }
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar Transacción
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva Transacción</DialogTitle>
                    <DialogDescription>
                        Registra una nueva venta o transferencia de esta propiedad
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Nombre / Descripción *
                        </label>
                        <Input
                            id="name"
                            placeholder="Ej: Venta a Juan Pérez"
                            {...register('name')}
                            disabled={isPending}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dateSale" className="text-sm font-medium">
                            Fecha de Venta *
                        </label>
                        <Input
                            id="dateSale"
                            type="date"
                            {...register('dateSale')}
                            disabled={isPending}
                        />
                        {errors.dateSale && (
                            <p className="text-sm text-destructive">{errors.dateSale.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="value" className="text-sm font-medium">
                                Valor (COP) *
                            </label>
                            <Input
                                id="value"
                                type="number"
                                placeholder="300000000"
                                {...register('value', { valueAsNumber: true })}
                                disabled={isPending}
                            />
                            {errors.value && (
                                <p className="text-sm text-destructive">{errors.value.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tax" className="text-sm font-medium">
                                Impuesto (COP) *
                            </label>
                            <Input
                                id="tax"
                                type="number"
                                placeholder="15000000"
                                {...register('tax', { valueAsNumber: true })}
                                disabled={isPending}
                            />
                            {errors.tax && (
                                <p className="text-sm text-destructive">{errors.tax.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={isPending} className="flex-1">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                'Guardar Transacción'
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}