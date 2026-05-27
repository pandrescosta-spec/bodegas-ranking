# 🍷 Ranking de Bodegas — Deploy en Vercel

App web para que los 30 participantes carguen sus calificaciones y vean el ranking en tiempo real.

---

## Pasos para publicar (15 minutos, todo gratis)

### 1. Crear cuenta en Vercel
Entrá a https://vercel.com y registrate (podés usar tu cuenta de GitHub o Google).

### 2. Subir el proyecto
**Opción A — Sin código (recomendado):**
1. Comprimí esta carpeta `bodegas-app` en un ZIP
2. Entrá a https://vercel.com/new
3. Elegí "Deploy from template" → arrastrá el ZIP

**Opción B — Con GitHub:**
1. Subí la carpeta a un repositorio de GitHub
2. En Vercel → "Add New Project" → importá el repo

### 3. Agregar la base de datos (Vercel KV)
1. En el dashboard de tu proyecto en Vercel, ir a **Storage** (menú superior)
2. Click en **Create Database** → elegí **KV (Redis)**
3. Ponerle nombre: `bodegas-kv` → Create
4. Click en **Connect to Project** → seleccioná tu proyecto → Connect

Esto crea automáticamente las variables de entorno necesarias (`KV_URL`, etc).

### 4. Redeploy
Después de conectar el KV, Vercel va a pedir hacer un redeploy:
1. Ir a **Deployments** → click en los tres puntitos del último deploy → **Redeploy**

### 5. ¡Listo!
Vercel te da una URL del estilo `https://bodegas-ranking.vercel.app`.
Compartila con el grupo y todos pueden cargar sus calificaciones.

---

## Funcionalidades

- **Ranking en vivo** con ponderación automática por cantidad de viajes
- **Filtro por viaje/año** en el ranking
- **Formulario inteligente**: solo habilita las bodegas de los viajes que cada uno marcó
- **Pesos automáticos**:
  - 1–2 viajes → Novato ×1
  - 3–5 viajes → Viajero ×1.5
  - 6–8 viajes → Habitual ×2
  - 9–11 viajes → Veterano ×3
- **Dark mode** automático según preferencia del sistema
- **Mobile-friendly**

---

## Estructura del proyecto

```
bodegas-app/
├── public/
│   └── index.html       ← App completa (frontend)
├── api/
│   └── ratings.js       ← API serverless (GET / POST / DELETE)
├── package.json
├── vercel.json
└── README.md
```

---

## Costo

Todo gratis dentro del plan gratuito de Vercel:
- Vercel Hobby: gratis (hasta 100GB de transferencia/mes)
- Vercel KV: gratis (hasta 30.000 requests/día, 256MB de datos)

Para 30 personas calificando bodegas, nunca van a necesitar el plan pago.
