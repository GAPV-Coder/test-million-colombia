# Million.Properties.Api - Backend

API REST para la gestión de propiedades inmobiliarias desarrollada en .NET 8 con MongoDB.

## 🚀 Características

- **Autenticación JWT** con roles (Owner, Admin)
- **CRUD completo** de propiedades, propietarios e historial de ventas
- **Filtros avanzados** por nombre, dirección y rango de precios
- **Subida de imágenes** usando GridFS de MongoDB
- **Documentación Swagger** automática
- **Pruebas unitarias** con NUnit y Moq
- **Arquitectura limpia** con separación de responsabilidades

## 🛠️ Tecnologías

- .NET 8
- MongoDB
- AutoMapper
- FluentValidation
- JWT Bearer Authentication
- Swagger/OpenAPI
- NUnit + Moq para testing
- Serilog para logging

## 📋 Prerrequisitos

- .NET 8 SDK
- MongoDB (local o Atlas)
- Visual Studio 2022 o VS Code

## 🔧 Configuración

## 1. Clonar repositorio GitHub 
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GAPV-Coder/test-million-colombia/tree/main
   cd backend/Million.Properties.Api

## 2. Configurar variables de entorno

- Crear archivo .env en la raíz del proyecto:
JWT_SECRET_KEY=tu-clave-secreta-super-segura-aqui
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/MillionDb

## 3. Configurar appsettings.json

{
  "JwtSettings": {
    "Issuer": "Million.Properties.Api",
    "Audience": "Million.Properties.Client",
    "Secret": "desde-env-var",
    "ExpiresInMinutes": 60
  },
  "ConnectionStrings": {
    "MongoDb": "desde-env-var"
  }
}

## 4. Restaurar paquetes NuGet

- dotnet restore

## 5. Ejecutar migraciones y seed data

- dotnet run
- La aplicación ejecutará automáticamente el seeder de datos.

## 🏃‍♂️ Ejecución

# Desarrollo
dotnet run

# Producción
dotnet build --configuration Release
dotnet run --configuration Release

## La API estará disponible en:

- API: https://localhost:5001
- Swagger: https://localhost:5001/swagger

## 🧪 Testing

# Ejecutar todas las pruebas
dotnet test

# Ejecutar pruebas con cobertura
dotnet test --collect:"XPlat Code Coverage"

# Ejecutar pruebas específicas
dotnet test --filter "TestCategory=Integration"

## 📚 Estructura del Proyecto

Million.Properties.Api/
├── Application/
│   ├── DTOs/           # Data Transfer Objects
│   ├── Interfaces/     # Contracts de servicios y repositorios
│   └── Services/       # Lógica de negocio
├── Domain/
│   └── Entities/       # Entidades del dominio
├── Infrastructure/
│   ├── FileStorage/    # Servicio GridFS
│   ├── Persistence/    # Repositorios y contexto MongoDB
│   └── Seed/           # Data inicial
├── Controllers/        # Controladores API
├── Validators/         # Validaciones FluentValidation
├── Config/             # Configuraciones
└── Tests/              # Pruebas unitarias

## 🔐 Autenticación
La API usa JWT Bearer tokens. Para acceder a endpoints protegidos:

Registrar usuario en /api/Auth/register

Iniciar sesión en /api/Auth/login

Usar el token en el header: Authorization: Bearer {token}

## 📊 Endpoints Principales
Propiedades
GET /api/Properties - Listar propiedades (público)

GET /api/Properties/{id} - Obtener propiedad por ID (público)

POST /api/Properties - Crear propiedad (requiere autenticación Owner)

PUT /api/Properties/{id} - Actualizar propiedad (solo propietario)

DELETE /api/Properties/{id} - Eliminar propiedad (solo propietario)

Autenticación
POST /api/Auth/register - Registrar nuevo usuario

POST /api/Auth/login - Iniciar sesión

Historial de Ventas
GET /api/PropertyTraces/{propertyId} - Obtener historial

POST /api/PropertyTraces - Agregar transacción (Owner)

## 🗃️ Base de Datos
La aplicación usa MongoDB con las siguientes colecciones:

Properties - Información de propiedades

Owners - Propietarios de las propiedades

PropertyImages - Imágenes de propiedades (GridFS)

PropertyTraces - Historial de transacciones

Users - Usuarios del sistema

## 🔍 Filtros Disponibles
Los endpoints de propiedades aceptan los siguientes query parameters:

name - Filtrar por nombre (búsqueda parcial case-insensitive)

address - Filtrar por dirección (búsqueda parcial)

minPrice - Precio mínimo

maxPrice - Precio máximo

page - Número de página (default: 1)

pageSize - Tamaño de página (default: 20)

## 🐛 Troubleshooting
Error de conexión a MongoDB
Verificar la cadena de conexión en .env

Asegurar que MongoDB esté ejecutándose

Verificar credenciales de la base de datos

Error JWT
Verificar que JWT_SECRET_KEY esté configurada

El token expira en 60 minutos por defecto

Problemas con imágenes
Verificar que GridFS esté habilitado en MongoDB

El tamaño máximo de archivo es 16MB (límite de MongoDB)

## 📈 Mejoras Futuras
Cache con Redis

Background jobs para procesamiento de imágenes

Notificaciones por email

Métricas y monitoreo

Dockerización

API rate limiting