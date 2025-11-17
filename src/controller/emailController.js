import { Resend } from "resend";
import { templates } from "../utils/templates.js";

import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envía un correo electrónico utilizando Resend
 * @param {string} to - Dirección de correo electrónico del destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} html - Contenido HTML del correo
 * @returns {Promise<Object>} - Respuesta del envío de correo
 */
const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Omnia <${process.env.EMAIL_FROM}>`,
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Error al enviar el correo:", error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error en sendEmail:", error);
    throw error;
  }
};

// Controladores para cada tipo de correo
const emailControllers = {
  newUser: async (req, res) => {
    try {
      const { email, name } = req.body;
      const html = templates({ name, email }).newUser();

      await sendEmail(email, "¡Bienvenido a Omnia!", html);

      res.status(200).json({
        success: true,
        message: "Correo de bienvenida enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar el correo de bienvenida",
        error: error.message,
      });
    }
  },

  newSubscription: async (req, res) => {
    try {
      const { email, name, planName, amount, endDate } = req.body;
      const html = templates({
        name,
        email,
        planName,
        amount,
        endDate,
      }).newSubscription();

      await sendEmail(email, "¡Suscripción Activada!", html);

      res.status(200).json({
        success: true,
        message: "Correo de activación de suscripción enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar el correo de activación de suscripción",
        error: error.message,
      });
    }
  },

  paymentSuccess: async (req, res) => {
    try {
      const { email, name, planName, amount, endDate, invoiceUrl } = req.body;
      const html = templates({
        name,
        email,
        planName,
        amount,
        endDate,
        invoiceUrl,
      }).paymentSuccess();

      await sendEmail(email, "¡Pago Recibido!", html);

      res.status(200).json({
        success: true,
        message: "Correo de confirmación de pago enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar el correo de confirmación de pago",
        error: error.message,
      });
    }
  },

  paymentPending: async (req, res) => {
    try {
      console.log("body paymentPending".req.body);
      const { email, name, planName, dashboardUrl } = req.body;
      const html = templates({
        name,
        email,
        planName,
        dashboardUrl,
      }).paymentPending();
      await sendEmail(email, "El pago se encuentra pendiente", html);
      res.status(200).json({
        success: true,
        message: "Correo de pago pendiente enviado correctamente",
      });
    } catch (error) {}
  },

  paymentFailed: async (req, res) => {
    try {
      console.log("body paymentFailed".req.body);
      const { email, name, planName, dashboardUrl } = req.body;
      const html = templates({
        name,
        email,
        planName,
        dashboardUrl,
      }).paymentFailed();

      await sendEmail(email, "Error en el Procesamiento del Pago", html);

      res.status(200).json({
        success: true,
        message: "Correo de error de pago enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar el correo de error de pago",
        error: error.message,
      });
    }
  },

  subscriptionCancel: async (req, res) => {
    try {
      const { email, name, planName, endDate } = req.body;
      const html = templates({
        name,
        email,
        planName,
        endDate,
      }).suscriptionCancel();

      await sendEmail(email, "Suscripción Cancelada", html);

      res.status(200).json({
        success: true,
        message: "Correo de cancelación de suscripción enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar el correo de cancelación de suscripción",
        error: error.message,
      });
    }
  },

  newFreeTrial: async (req, res) => {
    try {
      const { email, name, endDate } = req.body;
      const html = templates({ name, email, endDate }).newFreeTrial();

      await sendEmail(email, "¡Prueba Gratis Activada!", html);

      res.status(200).json({
        success: true,
        message: "Correo de prueba gratuita enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar el correo de prueba gratuita",
        error: error.message,
      });
    }
  },
};

export default emailControllers;
