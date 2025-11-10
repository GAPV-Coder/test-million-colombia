'use client'

import Link from 'next/link'
import { Search, TrendingUp, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Hero() {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/properties?name=${encodeURIComponent(searchTerm)}`)
        }
    }

    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />

            <div className="container">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Heading */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Encuentra tu{' '}
                            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                hogar perfecto
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Explora miles de propiedades premium y encuentra el lugar ideal para ti y tu familia
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Busca por nombre o ubicación..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-14 pl-12 pr-32 text-lg"
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                                Buscar
                            </Button>
                        </div>
                    </form>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/properties">
                            <Button variant="outline" size="lg" className="gap-2">
                                Ver todas las propiedades
                            </Button>
                        </Link>
                        <Link href="/properties?featured=true">
                            <Button variant="outline" size="lg" className="gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Propiedades destacadas
                            </Button>
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        <Card className="border-none shadow-lg">
                            <CardContent className="pt-6 text-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold">Propiedades Premium</h3>
                                <p className="text-sm text-muted-foreground">
                                    Accede a las mejores propiedades del mercado
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg">
                            <CardContent className="pt-6 text-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold">Compra Segura</h3>
                                <p className="text-sm text-muted-foreground">
                                    Transacciones verificadas y protegidas
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg">
                            <CardContent className="pt-6 text-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold">Soporte 24/7</h3>
                                <p className="text-sm text-muted-foreground">
                                    Asistencia disponible en todo momento
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}