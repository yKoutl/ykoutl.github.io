# 📊 Sistema de Estadísticas con Upstash Redis

Sistema completo de contadores de visitas y likes para tu portafolio, integrado con Upstash Redis (Vercel KV).

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

Las dependencias ya están configuradas en `package.json`:
- `@vercel/kv` - Cliente de Upstash Redis para Vercel
- `@vercel/analytics` - Analytics de Vercel

### 2. Configurar variables de entorno en Vercel

Ya tienes las variables configuradas en tu proyecto de Vercel:
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_REST_API_TOKEN`
- `KV_REST_API_URL`
- `KV_URL`
- `REDIS_URL`

### 3. Para desarrollo local (opcional)

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Y agrega tus credenciales de Upstash Redis.

## 📁 Archivos creados

```
mi-portafolio/
├── api/
│   └── stats.js                    # ✅ Serverless function para stats
├── src/
│   └── components/
│       └── common/
│           └── StatsBadge.jsx      # ✅ Componente de estadísticas
│   └── main.jsx                    # ✅ Analytics agregado
│   └── components/layout/
│       └── Navbar.jsx              # ✅ Integrado con StatsBadge
├── vercel.json                     # ✅ Configuración de Vercel
└── .env.example                    # ✅ Template de variables
```

## 🎯 Funcionalidades

### Contador de Visitas 👁️
- Se incrementa automáticamente al cargar la página
- Visible para todos los usuarios

### Contador de Likes ❤️
- Botón interactivo con animación
- Solo 1 like por usuario (guardado en localStorage)
- Cambio visual cuando ya diste like

### Características adicionales
- **Responsive**: Funciona en desktop y mobile
- **Tematizado**: Se adapta a los 8 temas de tu portafolio
- **Optimizado**: No afecta el rendimiento
- **Edge Runtime**: Respuestas ultra rápidas

## 🔧 API Endpoints

### `GET /api/stats`
Obtiene stats y suma 1 vista
```json
{ "views": 150, "likes": 25 }
```

### `GET /api/stats?action=get`
Obtiene stats sin incrementar
```json
{ "views": 150, "likes": 25 }
```

### `POST /api/stats?action=like`
Incrementa likes
```json
{ "views": 150, "likes": 26 }
```

## 🌐 Deploy en Vercel

1. **Push a tu repositorio**
```bash
git add .
git commit -m "feat: agregar sistema de estadísticas con Upstash Redis"
git push
```

2. **Vercel detectará automáticamente:**
   - Las variables de entorno ya configuradas
   - La función serverless en `/api/stats.js`
   - Las dependencias necesarias

3. **¡Listo!** Tu portafolio tendrá estadísticas en tiempo real

## 🎨 Personalización

### Cambiar formato de números
En `StatsBadge.jsx`, modifica la función `formatNumber`:
```javascript
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};
```

### Cambiar colores
El componente usa automáticamente `currentTheme`, pero puedes personalizar:
```javascript
style={{ backgroundColor: `${currentTheme.button}15` }}
```

### Cambiar posición
En `Navbar.jsx`, mueve el componente `<StatsBadge />` donde prefieras.

## 🧪 Testing local

Para probar localmente con Vite:

```bash
npm run dev
```

**Nota:** Las funciones serverless solo funcionan en producción con Vercel. En local, necesitarías configurar un proxy o usar Vercel CLI:

```bash
npx vercel dev
```

## 🔒 Seguridad

- Las credenciales están en variables de entorno (nunca en el código)
- Edge Runtime protege contra ataques
- CORS configurado para tu dominio
- localStorage previene múltiples likes

## 📈 Analytics de Vercel

Ya está integrado en `main.jsx`:
```javascript
import { Analytics } from "@vercel/analytics/react"
```

Podrás ver métricas avanzadas en tu dashboard de Vercel.

## 🐛 Troubleshooting

### Error: "Cannot find module '@vercel/kv'"
```bash
npm install @vercel/kv
```

### Stats no se actualizan
1. Verifica que las variables de entorno estén en Vercel
2. Revisa los logs en Vercel Dashboard > Functions

### Like no funciona
Verifica la consola del navegador. El localStorage debe estar habilitado.

## 🎉 ¡Listo!

Tu portafolio ahora tiene:
- ✅ Contador de visitas automático
- ✅ Sistema de likes interactivo
- ✅ Analytics de Vercel
- ✅ Todo integrado con Upstash Redis

---

**Hecho con ❤️ para tu portafolio**
