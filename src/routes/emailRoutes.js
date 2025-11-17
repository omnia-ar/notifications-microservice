import express from "express";
const router = express.Router();
import emailController from "../controller/emailController.js";

/**
 * @swagger
 * /api/emails/new-user:
 *   post:
 *     summary: Envía un correo de bienvenida a un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del destinatario
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 */
router.post("/new-user", emailController.newUser);

/**
 * @swagger
 * /api/emails/new-subscription:
 *   post:
 *     summary: Envía un correo de confirmación de suscripción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - planName
 *               - amount
 *               - endDate
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               planName:
 *                 type: string
 *               amount:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo de suscripción enviado correctamente
 */
router.post("/new-subscription", emailController.newSubscription);

/**
 * @swagger
 * /api/emails/payment-success:
 *   post:
 *     summary: Envía un correo de confirmación de pago exitoso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - planName
 *               - amount
 *               - endDate
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               planName:
 *                 type: string
 *               amount:
 *                 type: string
 *               endDate:
 *                 type: string
 *               invoiceUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo de pago exitoso enviado correctamente
 */
router.post("/payment-success", emailController.paymentSuccess);

/**
 * @swagger
 * /api/emails/payment-pending:
 *   post:
 *     summary: Envía un correo de notificación de pago pendiente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - planName
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               planName:
 *                 type: string
 *               dashboardUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificación de pago pendiente enviada correctamente
 */
router.post("/payment-pending", emailController.paymentPending);

/**
 * @swagger
 * /api/emails/payment-failed:
 *   post:
 *     summary: Envía un correo de notificación de pago fallido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - planName
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               planName:
 *                 type: string
 *               dashboardUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificación de pago fallido enviada correctamente
 */
router.post("/payment-failed", emailController.paymentFailed);

/**
 * @swagger
 * /api/emails/subscription-cancel:
 *   post:
 *     summary: Envía un correo de confirmación de cancelación de suscripción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - planName
 *               - endDate
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               planName:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificación de cancelación enviada correctamente
 */
router.post("/subscription-cancel", emailController.subscriptionCancel);

/**
 * @swagger
 * /api/emails/new-free-trial:
 *   post:
 *     summary: Envía un correo de bienvenida a la prueba gratuita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - endDate
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo de prueba gratuita enviado correctamente
 */
router.post("/new-free-trial", emailController.newFreeTrial);

export default router;
