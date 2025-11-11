'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, Heart, User, Menu, X, Plus, ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { clearUser } from '@/store/slices/userSlice'
import { cn } from '@/utils/cn'

export function Header() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isAuthenticated, user } = useAppSelector((state) => state.user)
    const favoriteCount = useAppSelector((state) => state.properties.favoriteIds.length)

    const handleLogout = () => {
        dispatch(clearUser())
        router.push('/')
    }

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
                    {isAuthenticated && (
                        <Link
                            href="/properties/create"
                            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                        >
                            <Plus className="h-4 w-4" />
                            Publicar Propiedad
                        </Link>
                    )}
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{user?.fullName?.split(' ')[0] || 'Usuario'}</span>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        <p className="font-medium text-sm">{user?.fullName}</p>
                                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push('/profile')}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Ver perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Iniciar Sesión</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Registrarse</Button>
                            </Link>
                        </div>
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

                        {isAuthenticated && (
                            <Link
                                href="/properties/create"
                                className="text-sm font-medium py-2 transition-colors hover:text-primary flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Plus className="h-4 w-4" />
                                Publicar Propiedad
                            </Link>
                        )}

                        <Link
                            href="/favorites"
                            className="text-sm font-medium py-2 transition-colors hover:text-primary flex items-center gap-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Heart className="h-4 w-4" />
                            Favoritos {favoriteCount > 0 && `(${favoriteCount})`}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="text-sm font-medium py-2 transition-colors hover:text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Mi Perfil
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setMobileMenuOpen(false)
                                    }}
                                    className="text-sm font-medium py-2 transition-colors hover:text-destructive text-left"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 pt-2">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">Iniciar Sesión</Button>
                                </Link>
                                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full">Registrarse</Button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}