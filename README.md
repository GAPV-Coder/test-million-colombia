# 🏠 Million Properties - Plataforma Inmobiliaria

Una aplicación full-stack moderna para la gestión y búsqueda de propiedades inmobiliarias, desarrollada con .NET 8 y Next.js 16.

## 🚀 Demo en Vivo (entorno local)

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Swagger Documentation**: [https://localhost:5001/swagger](https://localhost:5001/swagger)

## 📋 Descripción del Proyecto

Million Properties es una plataforma completa que permite:

### 👥 Para Usuarios Públicos
- 🔍 Buscar y filtrar propiedades por nombre, dirección y rango de precios
- 💰 Ver detalles completos de propiedades con imágenes
- ❤️ Guardar propiedades en favoritos
- 📊 Consultar historial de ventas y transacciones

### 👨‍💼 Para Propietarios Registrados
- ➕ Publicar nuevas propiedades
- ✏️ Gestionar sus propiedades (editar/eliminar)
- 🖼️ Subir imágenes de propiedades
- 📈 Registrar historial de ventas y transacciones
- 👀 Ver dashboard personal

## 🛠️ Arquitectura Técnica

Para esta aplicación se ha implementado una arquitectura limpia y la estructura del código es modular y mantenible, se ha aplicacio el principio SOLID de Responsabilidad Única (SRP)

Frontend (Next.js 16) ←→ Backend (.NET 8) ←→ MongoDB
↑ ↑
React Web API
TypeScript C#
Tailwind CSS AutoMapper
Redux Toolkit FluentValidation
React Query JWT Authentication


## 📁 Estructura del Repositorio

.
├── 📁 backend/          # API REST con .NET 8
│   ├── Application/     # Lógica de negocio
│   ├── Domain/          # Entidades y modelos
│   ├── Infrastructure/  # Acceso a datos
│   └── Controllers/     # Endpoints API
├── 📁 frontend/         # Aplicación Next.js 14
│   ├── app/             # App Router
│   ├── components/      # Componentes UI
│   ├── features/        # Funcionalidades
│   └── store/           # Estado global
└── 📄 README.md        # Este archivo


## 🚀 Características Principales

# Backend (.NET 8)
- ✅ API RESTful con arquitectura limpia

- ✅ Autenticación JWT con roles (Owner/User)

- ✅ Base de datos MongoDB con GridFS para imágenes

- ✅ Validaciones con FluentValidation

- ✅ Documentación automática con Swagger

- ✅ Tests unitarios con NUnit y Moq

- ✅ Paginación y filtros avanzados

# Frontend (Next.js 14)
- ✅ Interfaz responsive con Tailwind CSS

- ✅ Gestión de estado con Redux Toolkit

- ✅ Cache y sincronización con React Query

- ✅ Formularios con React Hook Form + Zod

- ✅ Tests con Jest y React Testing Library

- ✅ TypeScript en todo el proyecto

## ⚡ Inicio Rápido
# Prerrequisitos
.NET 8 SDK

Node.js 18+

MongoDB (local o Atlas)

## Ejecutar todo el proyecto

# Clonar repositorio
git clone https://github.com/tu-usuario/million-properties.git
cd million-properties

# Instalar y ejecutar Backend
cd backend
dotnet restore
dotnet run

# En otra terminal, instalar y ejecutar Frontend
cd frontend
npm install
npm run dev

## 📊 Estado del Proyecto

Componente	             Estado	         Cobertura de Tests
Backend API	             ✅ Completado	85%
Frontend App	         ✅ Completado	80%
Autenticación	         ✅ Completado	90%
Gestión de Propiedades	 ✅ Completado	88%
Subida de Imágenes	     ✅ Completado	75%

## 🔐 Roles y Permisos

- Usuario Público: Solo lectura de propiedades

- Usuario Owner: Gestión completa de sus propiedades

- Admin: Acceso total (futura implementación)

## 🌐 API Endpoints Principales

Método	Endpoint	           Descripción	          Autenticación
GET	    /api/Properties	       Listar propiedades	  Público
POST	/api/Properties	       Crear propiedad	      Owner
PUT	    /api/Properties/{id}   Actualizar propiedad	  Owner
POST	/api/Auth/register	   Registrar usuario	  Público
POST	/api/Auth/login	       Iniciarsesión	      Público

## 🤝 Contribución
- Fork el proyecto

- Crear una rama feature (git checkout -b feature/AmazingFeature)

- Commit cambios (git commit -m 'Add some AmazingFeature')

- Push a la rama (git push origin feature/AmazingFeature)

- Abrir un Pull Request

## 📝 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

## 👥 Equipo
- Gustavo Adolfo Pereira Villa - Desarrollador Full Stack - GitHub: [https://github.com/GAPV-Coder]

## 🙏 Agradecimientos
- Next.js - Framework de React

- .NET - Plataforma de desarrollo

- MongoDB - Base de datos

- Tailwind CSS - Framework CSS
