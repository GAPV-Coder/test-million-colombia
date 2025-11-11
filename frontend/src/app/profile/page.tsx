'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, LogOut, Mail, Shield, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { clearUser } from '@/store/slices/userSlice'

export default function ProfilePage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user, isAuthenticated } = useAppSelector((state) => state.user)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    const handleLogout = () => {
        dispatch(clearUser())
        router.push('/')
    }

    if (!isAuthenticated || !user) {
        return null
    }

    return (
        <Container className="py-12">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <Link href="/">
                    <Button variant="ghost" className="mb-6 gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Volver al inicio
                    </Button>
                </Link>

                {/* Profile Card */}
                <Card>
                    <CardHeader className="text-center pb-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <User className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{user.fullName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* User Information */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Información del Usuario</h3>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground">Nombre Completo</p>
                                        <p className="text-base font-medium">{user.fullName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                                        <p className="text-base font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground">Rol</p>
                                        <p className="text-base font-medium">{user.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="pt-4 border-t">
                            <Button
                                variant="destructive"
                                className="w-full gap-2"
                                size="lg"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}