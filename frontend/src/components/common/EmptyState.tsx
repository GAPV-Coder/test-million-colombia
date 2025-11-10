import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
    title?: string
    description?: string
    actionLabel?: string
    actionHref?: string
}

export function EmptyState({
    title = 'No hay propiedades',
    description = 'No se encontraron propiedades con los filtros seleccionados',
    actionLabel = 'Ver todas las propiedades',
    actionHref = '/properties',
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
            <Link href={actionHref}>
                <Button>{actionLabel}</Button>
            </Link>
        </div>
    )
}