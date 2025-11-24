import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import emailRoutes from "./routes/emailRoutes.js";

// Midleeware de errores
import { errorHandler } from "./middleware/errorHandler.js";
// Middleware de validación JWT
import { validateJWT } from "./middleware/validateJWT.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8082;

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10000, // límite de 100 requests por ventana
  message: "Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.",
});

// Middlewares
app.use(helmet()); // Seguridad básica
app.use(limiter);
app.use(express.json()); // Para parsear JSON en las peticiones

// Lista de orígenes permitidos
const allowedOrigins = [
  // Frontends
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_VERCEL,
  "https://www.omnia-ar.com",

  process.env.API_BACK_URL,
  process.env.PAYMENT_MICROSERVICE_URL,
  process.env.GATEWAY_URL,

  // Desarrollo local
  "http://localhost:3000",
  "http://localhost:9002",
].filter(Boolean); // Elimina valores undefined/null

console.log("✅ Backend Principal - Orígenes CORS permitidos:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (server-to-server, Postman, mobile apps)
      if (!origin) {
        console.log("ℹ️ Request sin origin - permitido");
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log(`✅ Origen permitido: ${origin}`);
        return callback(null, true);
      }

      console.error(`❌ Origen bloqueado por CORS: ${origin}`);
      return callback(
        new Error(`El origen '${origin}' no está permitido por CORS.`)
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Accept"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Servicio de notificaciones funcionando correctamente",
  });
});

// Rutas de la API
app.use("/api/emails", validateJWT, emailRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

// Middleware de manejo de errores global
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de notificaciones corriendo en el puerto ${PORT}`);
});

export default app;
