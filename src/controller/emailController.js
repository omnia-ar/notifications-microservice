import { Resend } from "resend";
import { templates } from "../utils/templates.js";

import { getUserDataBySub } from "../repository/userRespository.js";

import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const safeName = (name) => {
  if (!name) return "Usuario";
  return name;
};

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Omnia <${process.env.EMAIL_FROM}>`,
      to: [to],
      subject,
      html,
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

// URLs desde .env
const URLS = {
  dashboard: process.env.DASHBOARD_URL,
  invoiceBase: process.env.INVOICE_BASE_URL,
  planes: process.env.PLANES_URL,
  support: process.env.SUPPORT_URL,
};

const emailControllers = {
  newUser: async (req, res) => {
    try {
      const { email, name } = req.body;

      const html = templates({
        name: safeName(name),
        email,
        urls: URLS,
      }).newUser();

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
        name: safeName(name),
        email,
        planName,
        amount,
        endDate,
        urls: URLS,
      }).newSubscription();

      await sendEmail(email, "¡Suscripción Activada!", html);

      res.status(200).json({
        success: true,
        message: "Correo de activación enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar correo de activación",
        error: error.message,
      });
    }
  },

  paymentSuccess: async (req, res) => {
    try {
      const { email, name, planName, amount, endDate, invoiceId } = req.body;

      const invoiceUrl = `${URLS.invoiceBase}`;

      const html = templates({
        name: safeName(name),
        email,
        planName,
        amount,
        endDate,
        invoiceUrl,
        urls: URLS,
      }).paymentSuccess();

      await sendEmail(email, "¡Pago Recibido!", html);

      res.status(200).json({
        success: true,
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar correo de pago",
        error: error.message,
      });
    }
  },

  paymentPending: async (req, res) => {
    try {
      const { email, name, planName } = req.body;

      const html = templates({
        name: safeName(name),
        email,
        planName,
        dashboardUrl: URLS.dashboard,
        urls: URLS,
      }).paymentPending();

      await sendEmail(email, "El pago se encuentra pendiente", html);

      res.status(200).json({
        success: true,
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar correo",
        error: error.message,
      });
    }
  },

  paymentFailed: async (req, res) => {
    try {
      const { email, name, planName } = req.body;

      const html = templates({
        name: safeName(name),
        email,
        planName,
        dashboardUrl: URLS.dashboard,
        urls: URLS,
      }).paymentFailed();

      await sendEmail(email, "Error en el Procesamiento del Pago", html);

      res.status(200).json({
        success: true,
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar correo",
        error: error.message,
      });
    }
  },

  subscriptionCancel: async (req, res) => {
    try {
      const { email, name, planName, endDate } = req.body;

      const html = templates({
        name: safeName(name),
        email,
        planName,
        endDate,
        urls: URLS,
      }).suscriptionCancel();

      await sendEmail(email, "Suscripción Cancelada", html);

      res.status(200).json({
        success: true,
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar correo",
        error: error.message,
      });
    }
  },

  newFreeTrial: async (req, res) => {
    try {
      const { sub, endDate } = req.body;

      const dataUser = await getUserDataBySub(sub);
      const { name, email } = dataUser;

      const html = templates({
        name: safeName(name),
        email,
        endDate,
        urls: URLS,
      }).newFreeTrial();

      await sendEmail(email, "¡Prueba Gratis Activada!", html);

      res.status(200).json({
        success: true,
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar correo",
        error: error.message,
      });
    }
  },

  changeStatusSubscription: async (req, res) => {
    try {
      const { email, status } = req.body;

      // Validar que el status sea válido
      const validStatuses = [
        "active",
        "inactive",
        "trial",
        "canceled",
        "expired",
        "pending",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Estado inválido. Los estados válidos son: ${validStatuses.join(
            ", "
          )}`,
        });
      }

      // Obtener datos del usuario desde la base de datos
      const dataUser = await getUserDataBySub(email);
      const { name } = dataUser;

      const html = templates({
        name: safeName(name),
        email,
        urls: URLS,
      }).changeStatusSubscription(status);

      await sendEmail(email, "Actualización de tu Suscripción", html);

      res.status(200).json({
        success: true,
        message: "Correo de cambio de estado enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al enviar correo de cambio de estado",
        error: error.message,
      });
    }
  },
};

export default emailControllers;
