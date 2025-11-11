
# MillionHomes - Frontend

Aplicación web moderna para la gestión y búsqueda de propiedades inmobiliarias desarrollada con Next.js 16 y React.

## 🚀 Características

- **Interfaz responsive** optimizada para todos los dispositivos
- **Búsqueda y filtros** avanzados de propiedades
- **Sistema de favoritos** con persistencia local
- **Autenticación JWT** con roles de usuario
- **Gestión de propiedades** para usuarios propietarios
- **Historial de ventas** y transacciones
- **Subida de imágenes** de propiedades
- **Estado global** con Redux Toolkit
- **Cache y sincronización** con React Query

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Estado**: Redux Toolkit + React Query
- **Testing**: Jest + React Testing Library
- **HTTP Client**: Axios
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Backend API ejecutándose

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GAPV-Coder/test-million-colombia/tree/main
   cd frontend

## 2. Instalar dependencias

npm install
# o
yarn install

## 3. Configurar variables de entorno

NEXT_PUBLIC_API_URL=http://localhost:5000/api

## 4. Ejecutar en desarrollo

npm run dev
# o
yarn dev

La aplicación estará disponible en http://localhost:3000

## 🏗️ Estructura del Proyecto

src/
├── app/                    # App Router de Next.js
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── properties/        # Páginas de propiedades
│   └── ...
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de shadcn/ui
│   ├── layout/           # Componentes de layout
│   ├── common/           # Componentes comunes
│   └── properties/       # Componentes específicos de propiedades
├── features/             # Características organizadas por dominio
│   └── properties/       # Componentes de propiedades
├── hooks/                # Custom hooks
├── services/             # Servicios API
├── store/                # Configuración de Redux
├── types/                # Definiciones TypeScript
├── utils/                # Utilidades y helpers
└── lib/                  # Configuraciones de librerías

## 🧪 Testing

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm test:watch

# Ejecutar tests con cobertura
npm test:coverage

# Ejecutar tests específicos
npm test -- PropertyCard.test.tsx

Estructura de Tests
Component Tests: Pruebas de componentes con React Testing Library

Hook Tests: Pruebas de custom hooks

Util Tests: Pruebas de funciones utilitarias

Integration Tests: Pruebas de flujos completos

## 🎨 Componentes Principales

# PropertyCard
- Muestra información básica de propiedad

- Funcionalidad de favoritos

- Navegación a detalle

- Badges para propiedades nuevas

# PropertyFilters
- Búsqueda por nombre y dirección

- Filtros por rango de precios

- Filtros activos con badges

- Debounce para mejor performance

# PropertySalesHistory
- Historial de transacciones

- Estadísticas de ventas

- Formulario para agregar transacciones (propietarios)

## 🔐 Autenticación

# El flujo de autenticación incluye:

- Registro: Creación de cuenta con rol Owner

- Login: Autenticación con JWT

- Persistencia: Token almacenado en localStorage

- Protección de rutas: Middleware y guards

- Logout: Limpieza de estado y redirección

## 📱 Funcionalidades por Rol

# Usuario Público
- Ver listado de propiedades

- Buscar y filtrar propiedades

- Ver detalles de propiedades

- Agregar propiedades a favoritos

# Usuario Owner
- Todas las funcionalidades públicas

- Crear nuevas propiedades

- Editar y eliminar sus propiedades

- Gestionar historial de ventas

- Subir imágenes de propiedades

## 🗂️ Gestión de Estado
# Redux Toolkit
userSlice: Estado de autenticación y usuario

propertiesSlice: Favoritos y propiedades seleccionadas

filtersSlice: Filtros de búsqueda activos

# React Query
Cache de datos de propiedades

Sincronización automática

Gestión de estado de loading/error

Mutaciones optimistas

## 🔄 API Integration
La aplicación consume los siguientes endpoints:

# Propiedades
- GET    /api/Properties          # Listar con filtros
- GET    /api/Properties/{id}     # Obtener por ID
- POST   /api/Properties          # Crear propiedad
- PUT    /api/Properties/{id}     # Actualizar propiedad
- DELETE /api/Properties/{id}     # Eliminar propiedad

# Autenticación
- POST   /api/Auth/register       # Registrar usuario
- POST   /api/Auth/login          # Iniciar sesión

# Historial
- GET    /api/PropertyTraces/{id} # Obtener historial
- POST   /api/PropertyTraces      # Crear transacción

## 🎯 Características de UX
- Loading states en todas las operaciones async

- Error handling con mensajes descriptivos

- Optimistic updates para mejor percepción de performance

- Form validation con feedback visual

- Responsive design para móviles y desktop

- Accessibility con ARIA labels y navegación por teclado

## 🚀 Deployment

# Build para producción
npm run build
npm start

# Variables de entorno para producción
NEXT_PUBLIC_API_URL=https://api.tudominio.com/api

## 📊 Performance
- Lazy loading de componentes y rutas

- Image optimization con Next.js Image

- Code splitting automático

- Bundle analysis integrado

## 🐛 Troubleshooting

Problemas comunes
# Error de CORS

- Verificar que el backend tenga configurado CORS para el frontend

# Error de autenticación

- Verificar que el token JWT sea válido y no esté expirado

# Imágenes no cargan

- Verificar la URL del backend y permisos de CORS

# Build failures

- Verificar versiones de Node.js y dependencias

## 🔮 Mejoras Futuras
- PWA con service worker

- Modo offline con cache strategies

- Internacionalización (i18n)

- Notificaciones push

- Dashboard de analytics para propietarios

- Integración con mapas

- Chat en tiempo real

- Página de administración

## 📄 Licencia
Este proyecto está bajo la Licencia MIT.


Estos archivos proporcionan una cobertura completa de testing tanto para el backend como para el frontend, siguiendo las mejores prácticas y cubriendo los casos críticos de cada componente y servicio. Los README.md incluyen instrucciones detalladas para configurar, ejecutar y mantener ambos proyectos.
