'use client'

import Link from 'next/link'
import { Home, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Home className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold">MillionHomes</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Encuentra tu hogar ideal con las mejores propiedades del mercado.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Propiedades</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                                    Todas las Propiedades
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?featured=true" className="text-muted-foreground hover:text-primary transition-colors">
                                    Destacadas
                                </Link>
                            </li>
                            <li>
                                <Link href="/favorites" className="text-muted-foreground hover:text-primary transition-colors">
                                    Favoritos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Compañía</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Términos y Condiciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>contacto@millionhomes.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+57 300 123 4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Medellín, Colombia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MillionHomes. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}