import { z } from 'zod';

export const propertyFilterSchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    page: z.number().min(1).optional(),
    pageSize: z.number().min(1).max(100).optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    photo: z.string().url('URL de foto inválida').optional(),
});

export const createPropertySchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(200),
    address: z.string().min(1, 'La dirección es requerida').max(300),
    price: z.number().min(1, 'El precio debe ser mayor a 0'),
    codeInternal: z.string().min(1, 'El código interno es requerido'),
    year: z.number().min(1800).max(new Date().getFullYear() + 1),
    description: z.string().min(1, 'La descripción es requerida').max(2000),
    idOwner: z.string().min(1, 'El propietario es requerido'),
});

export const updatePropertySchema = createPropertySchema.partial();