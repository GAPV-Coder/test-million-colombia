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
import { useRegister } from '@/hooks/useAuth'
import { registerSchema } from '@/utils/validators'
import { RegisterUserDto } from '@/types/auth.types'
import { Home, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const { mutate: register, isPending } = useRegister()
    const [error, setError] = useState<string | null>(null)

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterUserDto>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'Owner',
        },
    })

    const password = watch('password')

    const onSubmit = (data: RegisterUserDto) => {
        setError(null)
        register(data, {
            onSuccess: () => {
                router.push('/')
            },
            onError: (error: any) => {
                setError(error.response?.data?.message || 'Error al registrarse. Por favor intenta nuevamente.')
            },
        })
    }

    // Password strength indicator
    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { strength: 0, label: '', color: '' }
        let strength = 0
        if (pwd.length >= 6) strength++
        if (pwd.length >= 10) strength++
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
        if (/\d/.test(pwd)) strength++
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++

        if (strength <= 2) return { strength, label: 'Débil', color: 'bg-red-500' }
        if (strength <= 3) return { strength, label: 'Media', color: 'bg-yellow-500' }
        return { strength, label: 'Fuerte', color: 'bg-green-500' }
    }

    const passwordStrength = getPasswordStrength(password || '')

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
                        <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
                        <CardDescription>
                            Regístrate para comenzar a publicar y guardar propiedades
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

                            {/* Full Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="text-sm font-medium leading-none">
                                    Nombre Completo
                                </label>
                                <Input
                                    id="fullName"
                                    placeholder="Juan Pérez"
                                    autoComplete="name"
                                    {...formRegister('fullName')}
                                    disabled={isPending}
                                    className={errors.fullName ? 'border-destructive' : ''}
                                />
                                {errors.fullName && (
                                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    autoComplete="email"
                                    {...formRegister('email')}
                                    disabled={isPending}
                                    className={errors.email ? 'border-destructive' : ''}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none">
                                    Contraseña
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    {...formRegister('password')}
                                    disabled={isPending}
                                    className={errors.password ? 'border-destructive' : ''}
                                />

                                {/* Password Strength Indicator */}
                                {password && password.length > 0 && (
                                    <div className="space-y-1">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-colors ${i < passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className={`text-xs ${passwordStrength.strength <= 2 ? 'text-red-500' :
                                            passwordStrength.strength <= 3 ? 'text-yellow-500' : 'text-green-500'
                                            }`}>
                                            Contraseña {passwordStrength.label}
                                        </p>
                                    </div>
                                )}

                                {errors.password && (
                                    <p className="text-sm text-destructive">{errors.password.message}</p>
                                )}

                                <p className="text-xs text-muted-foreground">
                                    Mínimo 6 caracteres. Usa mayúsculas, números y símbolos para mayor seguridad.
                                </p>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-muted-foreground">
                                    Al registrarte, aceptas nuestros{' '}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        Términos de Servicio
                                    </Link>{' '}
                                    y{' '}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Política de Privacidad
                                    </Link>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creando cuenta...
                                    </>
                                ) : (
                                    'Crear Cuenta'
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-sm text-muted-foreground text-center w-full">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Inicia sesión aquí
                            </Link>
                        </div>
                        <div className="text-xs text-muted-foreground text-center w-full">
                            <Link href="/" className="hover:underline">
                                Volver al inicio
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Container>
    )
}