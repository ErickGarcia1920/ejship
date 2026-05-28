# EJShip — Sistema de Gestión de Envíos y Paquetería

Sistema web para gestión de envíos con tracking en tiempo real, desarrollado para el curso de Ingeniería de Software — Universidad Mariano Gálvez de Guatemala.

##  Sistema en producción

- **Aplicación web:** https://ejship.vercel.app
- **API Backend:** https://ejship-backend.onrender.com

##  Equipo

- Erick Josué García Solares
- Yessica Liseth García Almengor
- Saúl Osberto Escobar Fuentes

##  Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Base de datos | PostgreSQL + Prisma |
| Seguridad | JWT + bcryptjs |
| Deploy Frontend | Vercel |
| Deploy Backend | Render |

##  Instalación y ejecución local

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

##  Variables de entorno

Crear archivo `.env` en `/backend`: