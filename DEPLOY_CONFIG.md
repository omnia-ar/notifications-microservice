# 📋 Configuración de Deploy - Omnia Notification Service

## ✅ Cambios Realizados

He actualizado todos los scripts de deploy para que usen **únicamente las variables de tu `.env`** actual, eliminando todas las variables innecesarias del proyecto anterior.

---

## 🗂️ Scripts Actualizados

### 1. **`build-image.sh`** ✅

- Construye y sube la imagen Docker a Google Artifact Registry
- **No requiere cambios** - solo hace build
- Puerto: 8080 (estándar Cloud Run)

### 2. **`deploy-cloud-run.sh`** ✅ (RECOMENDADO)

- Deploy a Cloud Run con **secretos en Secret Manager**
- Variables públicas inline, `RESEND_API_KEY` como secreto
- Timeout: 60s (suficiente para envío de emails)
- Memoria: 256Mi
- Puerto: 8080

**Variables configuradas:**

- `NODE_ENV=production`
- `EMAIL_FROM=noreply@omnia-ar.com`
- `URL_FRONT=https://omnia-ar.com/dashboard`
- `FRONTEND_URL=https://omnia-ar.com`
- `FRONTEND_URL_VERCEL=https://omnia-ai-nine.vercel.app`
- `PAYMENT_MICROSERVICE_URL`,
- `PAYMENTS_MICROSERVICE_TOKEN`
- `RESEND_API_KEY` (desde Secret Manager)

### 3. **`deploy-cloud-run-inline.sh`** ✅

- Deploy con **todas las variables inline** (incluye RESEND_API_KEY en el comando)
- ⚠️ **NO RECOMENDADO para producción** (expone credenciales)
- Útil para testing rápido

### 4. **`create-secrets.sh`** ✅

- Crea el secreto `RESEND_API_KEY` en Google Secret Manager
- Elimina todos los secretos innecesarios del otro proyecto
- Asigna permisos automáticamente a la cuenta de servicio

### 5. **`deploy.sh`** ✅ (Script Completo)

- Script interactivo que ejecuta todo el proceso:
  1. Verifica proyecto de GCP
  2. Crea secretos (opcional)
  3. Build de imagen (opcional)
  4. Deploy a Cloud Run
  5. Test del endpoint `/health`

### 6. **`manage-service.sh`** ✅

- Script de gestión del servicio ya desplegado
- Menú interactivo con opciones:
  - Ver logs en tiempo real
  - Ver estado del servicio
  - Probar endpoint `/health`
  - Ver métricas
  - Actualizar variables de entorno
  - Reiniciar servicio

### 7. **`Dockerfile`** ✅

- Corregí el comando de arranque: `CMD ["node", "src/app.js"]`
- Puerto: 8080 (Cloud Run lo establece automáticamente)

---

## 🚀 Cómo Usar los Scripts

### Opción 1: Deploy Completo (RECOMENDADO)

```bash
chmod +x *.sh
./deploy.sh
```

Este script te guiará paso a paso.

### Opción 2: Deploy Manual

```bash
# 1. Crear secretos en Secret Manager
./create-secrets.sh

# 2. Construir imagen
./build-image.sh

# 3. Desplegar a Cloud Run
./deploy-cloud-run.sh
```

### Opción 3: Deploy Rápido (sin secretos)

```bash
./deploy-cloud-run-inline.sh
```

⚠️ Solo para desarrollo/testing

---

## 🔐 Variables Sensibles

**Única variable sensible:**

- `RESEND_API_KEY` → Se guarda en Secret Manager

**Todas las demás variables son públicas** (URLs, tokens de validación interna, etc.)

---

## 📝 Notas Importantes

1. **Puerto**: Cloud Run establece automáticamente `PORT=8080`. Tu app lee `process.env.PORT || 8082`, por lo que usará 8080 en producción.

2. **URLs de Microservicios**: Las URLs como `MICROSERVICE_1_URL` están configuradas con localhost. En producción, deberías cambiarlas a las URLs reales de tus servicios desplegados.

3. **CORS**: Tu app ya tiene configurado CORS con las URLs de tu frontend. Verifica que estén correctas en `src/app.js`.

4. **Timeout**: Configurado en 60s (suficiente para envío de emails). Si necesitas más tiempo, ajusta el parámetro `--timeout`.

---

## 🧪 Testing

Después del deploy, prueba el servicio:

```bash
# Opción 1: Usar el script de gestión
./manage-service.sh
# Selecciona opción 10: Probar endpoint /health

# Opción 2: Manual
SERVICE_URL=$(gcloud run services describe omnia-notification-microservice \
  --region southamerica-east1 \
  --format='value(status.url)')

curl $SERVICE_URL/health
```

---

## 📊 Comandos Útiles

```bash
# Ver logs en tiempo real
gcloud run services logs tail omnia-notification-microservice --region southamerica-east1 --follow

# Ver URL del servicio
gcloud run services describe omnia-notification-microservice --region southamerica-east1 --format='value(status.url)'

# Actualizar una variable
gcloud run services update omnia-notification-microservice \
  --region southamerica-east1 \
  --update-env-vars KEY=VALUE

# Ver todas las revisiones
gcloud run revisions list --service omnia-notification-microservice --region southamerica-east1
```

---

## ✅ Variables Eliminadas del Proyecto Anterior

Se eliminaron todas estas variables que NO son necesarias para el notification-service:

- ❌ OPENAI_API_KEY
- ❌ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- ❌ DATABASE_URL, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- ❌ MONGODB_URI
- ❌ JWT_SECRET, JWT_EXPIRES_IN
- ❌ SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- ❌ REDIS_URL
- ❌ RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS
- ❌ LOG_LEVEL
- ❌ BACKEND_URL
- ❌ CORS_ORIGIN_WHITELIST

---

## 🎯 Siguiente Paso

Ejecuta el deploy completo:

```bash
./deploy.sh
```

¡Listo! 🚀
