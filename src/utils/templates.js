const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  body { 
    font-family: 'Inter', Arial, sans-serif; 
    margin: 0; 
    padding: 0; 
    background-color: #1a1a1a; 
    color: #f5f5f5; 
  }

  .container { 
    max-width: 600px; 
    margin: 0 auto; 
    background-color: #232323; 
  }

  .header { 
    padding: 24px; 
    text-align: center; 
    border-bottom: 1px solid #333333; 
  }

  .content { 
    padding: 24px; 
    color: #ffffff; /* ← Texto blanco dentro del contenido */
  }

  .footer { 
    padding: 16px; 
    text-align: center; 
    font-size: 12px; 
    color: #999999; 
    background-color: #1a1a1a; 
  }

  .button { 
    display: inline-block; 
    padding: 12px 24px; 
    background-color: #750b9f; 
    color: white !important; 
    text-decoration: none; 
    border-radius: 4px; 
    font-weight: 500;
    margin: 16px 0;
  }

  .text-muted { color: #999999; }

  .text-accent { color: #9d4edd; }

  .card { 
    background-color: #333333; 
    border-radius: 8px; 
    padding: 16px; 
    margin: 16px 0;
    border-left: 4px solid #9d4edd;
    color: #ffffff; /* ← TEXTO BLANCO EN LAS CARDS */
  }

  .card h3,
  .card p,
  .card strong {
    color: #ffffff !important; /* ← Asegura blanco en todos los textos */
  }

  .divider { 
    height: 1px; 
    background-color: #333333; 
    margin: 24px 0; 
    border: none;
  }
`;

const getEmailTemplate = (content, title) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Omnia</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="color: #9d4edd; margin: 0;">Omnia</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <hr class="divider">
    <div class="footer">
      <p>© ${new Date().getFullYear()} Omnia. Todos los derechos reservados.</p>
      <p class="text-muted">Si no solicitaste este correo, puedes ignorarlo.</p>
    </div>
  </div>
</body>
</html>
`;

export const templates = (user = {}) => {
  const {
    name = "Usuario",
    email = "usuario@ejemplo.com",
    planName = "Plan Básico",
    endDate = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    amount = "9.99",
    invoiceUrl = "https://omnia-ar.com/payments/history",
    supportEmail = "soporte@omnia-ar.com",
    loginUrl = "https://omnia-ar.com/login",
    dashboardUrl = "https://omnia-ar.com/dashboard",
  } = user;

  return {
    newUser: () =>
      getEmailTemplate(
        `
      <h2>¡Bienvenido a Omnia, ${name}!</h2>
      <p>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
      <p>Tu cuenta ha sido creada exitosamente con el correo: <strong>${email}</strong></p>
      
      <div class="card">
        <h3>¿Listo para comenzar?</h3>
        <p>Inicia sesión ahora para explorar todas las funciones disponibles:</p>
        <a href="${loginUrl}" class="button">Iniciar Sesión</a>
      </div>
      
      <p>Si tienes alguna pregunta, no dudes en contactarnos a <a href="mailto:${supportEmail}" class="text-accent">${supportEmail}</a>.</p>
    `,
        "Bienvenido a Omnia"
      ),

    newSubscription: () =>
      getEmailTemplate(
        `
      <h2>¡Suscripción Activada!</h2>
      <p>Hola ${name},</p>
      <p>Tu suscripción al <strong>${planName}</strong> ha sido activada exitosamente.</p>
      
      <div class="card">
        <h3>Detalles de tu suscripción:</h3>
        <p><strong>Plan:</strong> ${planName}</p>
        <p><strong>Próximo cargo:</strong> ${endDate}</p>
        <p><strong>Monto:</strong> $${amount} ARS</p>
      </div>
      
      <p>Puedes gestionar tu suscripción en cualquier momento desde tu <a href="${dashboardUrl}" class="text-accent">panel de control</a>.</p>
      <a href="${dashboardUrl}" class="button">Ir al Panel de Control</a>
    `,
        "Suscripción Activada"
      ),

    newFreeTrial: () =>
      getEmailTemplate(
        `
      <h2>¡Prueba Gratis Activada!</h2>
      <p>Hola ${name},</p>
      <p>¡Bienvenido a tu período de prueba gratuito de 14 días con Omnia!</p>
      
      <div class="card">
        <h3>Tu prueba gratuita incluye:</h3>
        <p>✓ Acceso completo a todas las funciones</p>
        <p>✓ Soporte prioritario</p>
        <p>✓ Sin cargos ocultos</p>
        <p><strong>Fecha de finalización:</strong> ${endDate}</p>
      </div>
      
      <p>¿Listo para comenzar? Inicia sesión ahora para explorar todas las funciones disponibles.</p>
      <a href="${loginUrl}" class="button">Comenzar Ahora</a>
      
      <p>Si tienes alguna pregunta, nuestro equipo de soporte está aquí para ayudarte.</p>
    `,
        "Prueba Gratis Activada"
      ),

    suscriptionCancel: () =>
      getEmailTemplate(
        `
      <h2>Lamentamos que te vayas, ${name}</h2>
      <p>Hemos procesado la cancelación de tu suscripción a Omnia.</p>
      
      <div class="card">
        <h3>Detalles de la cancelación:</h3>
        <p><strong>Plan:</strong> ${planName}</p>
        <p><strong>Fecha de finalización:</strong> ${endDate}</p>
      </div>
      
      <p>Tendrás acceso a todas las funciones hasta el final de tu período de facturación actual.</p>
      <p>Si cambias de opinión, puedes reactivar tu suscripción en cualquier momento antes de ${endDate} sin perder ninguna configuración.</p>
      
      <p>¿Fue útil tu experiencia con nosotros? Nos encantaría escuchar tus comentarios para mejorar.</p>
    `,
        "Suscripción Cancelada"
      ),

    paymentSuccess: () =>
      getEmailTemplate(
        `
      <h2>¡Pago Recibido!</h2>
      <p>Hola ${name},</p>
      <p>Hemos recibido tu pago por <strong>$${amount} ARS</strong> para tu suscripción a <strong>${planName}</strong>.</p>
      
      <div class="card">
        <h3>Resumen del pago:</h3>
        <p><strong>Monto:</strong> $${amount} ARS</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Próximo cargo:</strong> ${endDate}</p>
        <p><a href="${invoiceUrl}" class="text-accent">Ver pago en la web</a></p>
      </div>
      
      <p>Gracias por confiar en Omnia. ¡Disfruta de nuestros servicios!</p>
    `,
        "Pago Recibido"
      ),

    paymentFailed: () =>
      getEmailTemplate(
        `
      <h2>Error en el Procesamiento del Pago</h2>
      <p>Hola ${name},</p>
      <p>No pudimos procesar el pago de tu suscripción a <strong>${planName}</strong>.</p>
      
      <div class="card" style="border-left-color: #7a2323;">
        <h3>Detalles del error:</h3>
        <p>Por favor, actualiza tu método de pago para evitar interrupciones en el servicio.</p>
        <p>Si el problema persiste, te recomendamos verificar los detalles de tu tarjeta o contactar a tu banco.</p>
      </div>
      
      <p>Puedes actualizar tu método de pago haciendo clic en el siguiente enlace:</p>
      <a href="${dashboardUrl}/billing" class="button">Actualizar Método de Pago</a>
      
      <p>Si necesitas ayuda, no dudes en contactar a nuestro equipo de soporte.</p>
    `,
        "Error en el Pago"
      ),

    paymentPending: () =>
      getEmailTemplate(
        `
      <h2>Pago Pendiente</h2>
      <p>Hola ${name},</p>
      <p>Hemos recibido tu solicitud de pago por <strong>$${amount} ARS</strong> para tu suscripción a <strong>${planName}</strong>.</p>
      
      <div class="card" style="border-left-color: #9d4edd;">
        <h3>Detalles del pago pendiente:</h3>
        <p><strong>Monto:</strong> $${amount} ARS</p>
        <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleDateString()}</p>
        <p>Una vez que el pago sea procesado, recibirás una confirmación por correo electrónico.</p>
      </div>
      
      <p>Si no realizaste esta transacción o necesitas ayuda, por favor contáctanos de inmediato.</p>
    `,
        "Pago Pendiente"
      ),

    changeStatusSubscription: (status = "pending") =>
      getEmailTemplate(
        `
      ${(() => {
        // Mapeo de estados a información legible
        const statusInfo = {
          active: {
            label: "Activa",
            color: "#22c55e",
            bgColor: "#dcfce7",
            icon: "✓",
            message:
              "¡Excelente! Tu suscripción está activa y puedes disfrutar de todos los beneficios de Omnia.",
            action:
              "Explora todas las funcionalidades disponibles en tu cuenta.",
          },
          inactive: {
            label: "Inactiva",
            color: "#ef4444",
            bgColor: "#fee2e2",
            icon: "⚠",
            message:
              "Tu suscripción se encuentra temporalmente inactiva. Puedes reactivarla en cualquier momento.",
            action:
              "Contacta con soporte o revisa tu método de pago para reactivar tu cuenta.",
          },
          trial: {
            label: "Periodo de Prueba",
            color: "#3b82f6",
            bgColor: "#dbeafe",
            icon: "🚀",
            message:
              "¡Bienvenido! Estás en tu periodo de prueba gratuito. Explora todas las funcionalidades de Omnia.",
            action:
              "Aprovecha al máximo tu periodo de prueba y considera suscribirte para continuar.",
          },
          canceled: {
            label: "Cancelada",
            color: "#6b7280",
            bgColor: "#f3f4f6",
            icon: "✕",
            message:
              "Tu suscripción ha sido cancelada. Lamentamos verte partir.",
            action:
              "Si cambias de opinión, puedes volver a suscribirte en cualquier momento.",
          },
          expired: {
            label: "Expirada",
            color: "#f97316",
            bgColor: "#fed7aa",
            icon: "⏰",
            message:
              "Tu suscripción ha expirado. Renueva tu plan para seguir disfrutando de Omnia.",
            action:
              "Renueva tu suscripción para recuperar el acceso completo a la plataforma.",
          },
          pending: {
            label: "Pendiente",
            color: "#eab308",
            bgColor: "#fef3c7",
            icon: "⏳",
            message:
              "Tu suscripción está siendo procesada. Te notificaremos cuando esté lista.",
            action:
              "Mantente atento a tu email para recibir actualizaciones sobre tu suscripción.",
          },
        };

        const currentStatus = statusInfo[status] || statusInfo.pending;

        return `
          <div style="text-align: center; margin-bottom: 24px;">
            <p style="color: #999999; font-size: 0.9rem; margin-bottom: 16px;">Actualización de tu suscripción</p>
            
            <!-- Estado Badge -->
            <div style="display: inline-block; background: ${
              currentStatus.bgColor
            }; color: ${
          currentStatus.color
        }; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; margin-bottom: 20px;">
              <span style="margin-right: 6px;">${currentStatus.icon}</span>
              ${currentStatus.label}
            </div>
          </div>

          <h2 style="color: #9d4edd; margin: 0 0 20px 0; font-size: 1.5rem; font-weight: 600;">
            Estado de tu suscripción actualizado
          </h2>

          <div style="background: #2a2a2a; border-radius: 8px; padding: 24px; margin: 24px 0; border-left: 4px solid ${
            currentStatus.color
          };">
            <p style="color: #f5f5f5; font-size: 1rem; margin: 0 0 12px 0; line-height: 1.6;">
              <strong>Estado actual:</strong> ${currentStatus.label}
            </p>
            <p style="color: #cccccc; font-size: 0.95rem; margin: 0; line-height: 1.6;">
              ${currentStatus.message}
            </p>
          </div>

          <div class="card">
            <h3 style="color: #9d4edd; margin: 0 0 12px 0; font-size: 1.1rem; font-weight: 600;">
              ¿Qué puedes hacer ahora?
            </h3>
            <p style="color: #cccccc; font-size: 0.95rem; margin: 0; line-height: 1.6;">
              ${currentStatus.action}
            </p>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${dashboardUrl}" class="button">
              Ir a mi cuenta
            </a>
          </div>

          <!-- Información adicional basada en el estado -->
          ${
            status === "active"
              ? `
          <div style="background: #0f3f0f; border-radius: 8px; padding: 16px; margin: 24px 0; border: 1px solid #22c55e;">
            <p style="color: #22c55e; font-size: 0.9rem; margin: 0; text-align: left;">
              <strong>🎉 ¡Tu suscripción está activa!</strong><br>
              • Acceso completo a todas las funcionalidades<br>
              • Soporte prioritario<br>
              • Actualizaciones automáticas
            </p>
          </div>
          `
              : ""
          }

          ${
            status === "trial"
              ? `
          <div style="background: #1e3a8a; border-radius: 8px; padding: 16px; margin: 24px 0; border: 1px solid #3b82f6;">
            <p style="color: #3b82f6; font-size: 0.9rem; margin: 0; text-align: left;">
              <strong>🚀 Periodo de prueba activo</strong><br>
              • Explora todas las funcionalidades sin limitaciones<br>
              • Duración limitada - ¡aprovéchala al máximo!<br>
              • Sin compromiso durante el periodo de prueba
            </p>
          </div>
          `
              : ""
          }

          ${
            status === "expired" || status === "inactive"
              ? `
          <div style="background: #7c2d12; border-radius: 8px; padding: 16px; margin: 24px 0; border: 1px solid #f97316;">
            <p style="color: #f97316; font-size: 0.9rem; margin: 0; text-align: left;">
              <strong>⚡ Renueva tu suscripción</strong><br>
              • Recupera el acceso completo a la plataforma<br>
              • Mantén tus datos y configuraciones<br>
              • Ofertas especiales disponibles para renovación
            </p>
          </div>
          `
              : ""
          }

          <p style="color: #999999; font-size: 0.9rem; margin: 32px 0 0 0; line-height: 1.5;">
            Si tienes alguna pregunta sobre tu suscripción, no dudes en contactarnos en
            <a href="mailto:${supportEmail}" style="color: #9d4edd; text-decoration: none;">${supportEmail}</a>.<br>
            ¡Gracias por ser parte de Omnia!
          </p>
        `;
      })()}
    `,
        "Actualización de Suscripción"
      ),
  };
};
