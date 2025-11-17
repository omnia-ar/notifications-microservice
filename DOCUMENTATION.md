# Documentación del Servicio de Notificaciones por Correo

Este servicio proporciona una API REST para enviar diferentes tipos de correos electrónicos utilizando plantillas predefinidas.

## Configuración

1. Instalar dependencias:
   ```bash
   npm install express cors helmet dotenv resend
   ```

2. Configurar variables de entorno (crear o editar `.env`):
   ```env
   PORT=3000
   NODE_ENV=development
   RESEND_API_KEY=tu_api_key_de_resend
   EMAIL_FROM=notificaciones@tudominio.com
   ```

3. Iniciar el servidor:
   ```bash
   npm start
   ```

## Endpoints

### 1. Verificar estado del servicio
- **URL**: `GET /health`
- **Respuesta exitosa**:
  ```json
  {
    "status": "OK",
    "message": "Servicio de notificaciones funcionando correctamente"
  }
  ```

### 2. Enviar correo de bienvenida a nuevo usuario
- **URL**: `POST /api/emails/new-user`
- **Cuerpo de la petición**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "name": "Nombre del Usuario"
  }
  ```

### 3. Enviar correo de nueva suscripción
- **URL**: `POST /api/emails/new-subscription`
- **Cuerpo de la petición**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "name": "Nombre del Usuario",
    "planName": "Plan Premium",
    "amount": "1999.99",
    "endDate": "2023-12-31"
  }
  ```

### 4. Enviar confirmación de pago exitoso
- **URL**: `POST /api/emails/payment-success`
- **Cuerpo de la petición**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "name": "Nombre del Usuario",
    "planName": "Plan Premium",
    "amount": "1999.99",
    "endDate": "2023-12-31",
    "invoiceUrl": "https://tudominio.com/factura/12345"
  }
  ```

### 5. Notificar pago fallido
- **URL**: `POST /api/emails/payment-failed`
- **Cuerpo de la petición**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "name": "Nombre del Usuario",
    "planName": "Plan Premium",
    "dashboardUrl": "https://tudominio.com/mi-cuenta"
  }
  ```

### 6. Confirmar cancelación de suscripción
- **URL**: `POST /api/emails/subscription-cancel`
- **Cuerpo de la petición**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "name": "Nombre del Usuario",
    "planName": "Plan Premium",
    "endDate": "2023-12-31"
  }
  ```

### 7. Enviar correo de bienvenida a prueba gratuita
- **URL**: `POST /api/emails/new-free-trial`
- **Cuerpo de la petición**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "name": "Nombre del Usuario",
    "endDate": "2023-12-31"
  }
  ```

## Respuestas

Todas las respuestas siguen el siguiente formato:

```json
{
  "success": true,
  "message": "Mensaje descriptivo del resultado"
}
```

En caso de error:

```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Mensaje detallado del error (solo en desarrollo)"
}
```

## Variables de Entorno

- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 3000)
- `NODE_ENV`: Entorno de ejecución (development/production)
- `RESEND_API_KEY`: Tu clave de API de Resend
- `EMAIL_FROM`: Dirección de correo que aparecerá como remitente

## Ejemplo de Uso con cURL

```bash
curl -X POST http://localhost:3000/api/emails/new-user \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","name":"Juan Pérez"}'
```

## Notas

- Todas las fechas deben estar en formato ISO 8601 (YYYY-MM-DD)
- Los montos deben ser números como cadenas de texto
- Asegúrate de configurar correctamente tu API key de Resend
