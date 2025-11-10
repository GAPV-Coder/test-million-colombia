'use client'

import Link from 'next/link'
import { Home, Search, Heart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { cn } from '@/utils/cn'

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isAuthenticated, user } = useAppSelector((state) => state.user)
    const favoriteCount = useAppSelector((state) => state.properties.favoriteIds.length)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Home className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        MillionHomes
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/properties"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Explorar Propiedades
                    </Link>
                    <Link
                        href="/properties?featured=true"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Destacadas
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/favorites">
                        <Button variant="ghost" size="icon" className="relative">
                            <Heart className="h-5 w-5" />
                            {favoriteCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                    {favoriteCount}
                                </span>
                            )}
                        </Button>
                    </Link>

                    {isAuthenticated ? (
                        <Link href="/profile">
                            <Button variant="outline" size="sm" className="gap-2">
                                <User className="h-4 w-4" />
                                {user?.fullName?.split(' ')[0] || 'Perfil'}
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">Iniciar Sesión</Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t">
                    <nav className="container py-4 flex flex-col space-y-3">
                        <Link
                            href="/properties"
                            className="text-sm font-medium py-2 transition-colors hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Explorar Propiedades
                        </Link>
                        <Link
                            href="/favorites"
                            className="text-sm font-medium py-2 transition-colors hover:text-primary flex items-center gap-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Heart className="h-4 w-4" />
                            Favoritos {favoriteCount > 0 && `(${favoriteCount})`}
                        </Link>
                        {isAuthenticated ? (
                            <Link
                                href="/profile"
                                className="text-sm font-medium py-2 transition-colors hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Mi Perfil
                            </Link>
                        ) : (
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full">Iniciar Sesión</Button>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}