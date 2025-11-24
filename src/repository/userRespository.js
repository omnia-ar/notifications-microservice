import query from "../config/database.js";

export const getUserDataBySub = async (sub) => {
  try {
    const result = await query(`SELECT name, email FROM users WHERE sub = $1`, [
      sub,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    throw error;
  }
};
