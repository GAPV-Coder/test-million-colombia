'use client'

import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { usePropertyTrace } from '@/hooks/usePropertyTrace'
import { TrendingUp, Calendar, DollarSign, Receipt } from 'lucide-react'

interface PropertySalesHistoryProps {
    propertyId: string
}

export function PropertySalesHistory({ propertyId }: PropertySalesHistoryProps) {
    const { data: traces, isLoading } = usePropertyTrace(propertyId)

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                    ))}
                </CardContent>
            </Card>
        )
    }

    if (!traces || traces.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Historial de Ventas
                    </CardTitle>
                    <CardDescription>
                        Registro de transacciones de esta propiedad
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>No hay historial de ventas disponible</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Calcular estadísticas
    const totalValue = traces.reduce((sum, trace) => sum + trace.value, 0)
    const totalTax = traces.reduce((sum, trace) => sum + trace.tax, 0)
    const averageValue = totalValue / traces.length

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Historial de Ventas
                </CardTitle>
                <CardDescription>
                    {traces.length} {traces.length === 1 ? 'transacción registrada' : 'transacciones registradas'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span>Valor Total</span>
                        </div>
                        <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>Valor Promedio</span>
                        </div>
                        <p className="text-2xl font-bold">{formatCurrency(averageValue)}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Receipt className="h-4 w-4" />
                            <span>Impuestos Totales</span>
                        </div>
                        <p className="text-2xl font-bold">{formatCurrency(totalTax)}</p>
                    </div>
                </div>

                {/* Lista de Transacciones */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground">Transacciones</h4>
                    {traces.map((trace, index) => (
                        <div
                            key={trace.idPropertyTrace || index}
                            className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h5 className="font-semibold">{trace.name}</h5>
                                        {index === 0 && (
                                            <Badge variant="secondary" className="text-xs">
                                                Más reciente
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{formatDate(trace.dateSale, 'dd MMM yyyy')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right space-y-1">
                                    <p className="text-lg font-bold text-primary">
                                        {formatCurrency(trace.value)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Impuesto: {formatCurrency(trace.tax)}
                                    </p>
                                    <p className="text-xs font-medium">
                                        Total: {formatCurrency(trace.value + trace.tax)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nota informativa */}
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-sm text-blue-900 dark:text-blue-100">
                    <p className="font-medium mb-1">ℹ️ Información</p>
                    <p className="text-xs opacity-80">
                        Este historial muestra todas las transacciones registradas para esta propiedad,
                        incluyendo ventas, transferencias y actualizaciones de valor.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}