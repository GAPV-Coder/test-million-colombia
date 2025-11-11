'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { useLogin } from '@/hooks/useAuth'
import { loginSchema } from '@/utils/validators'
import { LoginDto } from '@/types/auth.types'
import { Home, Loader2, AlertCircle } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const { mutate: login, isPending } = useLogin()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDto>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: LoginDto) => {
        setError(null)
        login(data, {
            onSuccess: () => {
                router.push('/')
            },
            onError: (error: any) => {
                setError(error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.')
            },
        })
    }

    return (
        <Container className="py-16 min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Home className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        MillionHomes
                    </span>
                </Link>

                <Card>
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para acceder a tu cuenta
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Error Message */}
                            {error && (
                                <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    autoComplete="email"
                                    {...register('email')}
                                    disabled={isPending}
                                    className={errors.email ? 'border-destructive' : ''}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Contraseña
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    {...register('password')}
                                    disabled={isPending}
                                    className={errors.password ? 'border-destructive' : ''}
                                />
                                {errors.password && (
                                    <p className="text-sm text-destructive">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-sm text-muted-foreground text-center w-full">
                            ¿No tienes una cuenta?{' '}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Regístrate aquí
                            </Link>
                        </div>
                        <div className="text-xs text-muted-foreground text-center w-full">
                            <Link href="/" className="hover:underline">
                                Volver al inicio
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                {/* Demo Credentials Info */}
                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-sm text-blue-900 dark:text-blue-100">
                    <p className="font-medium mb-2">💡 Nota para desarrollo:</p>
                    <p className="text-xs opacity-80">
                        Puedes crear una cuenta nueva o usar credenciales de prueba si están disponibles.
                    </p>
                </div>
            </div>
        </Container>
    )
}