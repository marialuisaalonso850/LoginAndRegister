// auth.test.js

const auth = require('./src/controllers/auth.controller');

// Supongamos que la URL de tu backend para el registro es '/api/register'
const REGISTER_URL = 'http://localhost:4000/api/register';

describe('Registro de usuario', () => {
  it('Debería registrar un nuevo usuario correctamente', async () => {
    const newUser = {
     email :'marialuisaalonso850@gmail.com',
      username: 'nuevoUsuario',
      password: 'contraseña123',
    };

    try {
      const response = await auth.post(REGISTER_URL, newUser);
      // Supongamos que el backend responde con un objeto JSON que contiene un mensaje de éxito
      expect(response.data.message).toBe('Usuario registrado correctamente');
    } catch (error) {
      // Si ocurre un error en el registro, la prueba debe fallar
      throw new Error('Registro fallido');
    }
  });

  it('Debería fallar si se intenta registrar un usuario existente', async () => {
    const existingUser = {
        email :'marialuisaalonso850@gmail.com',
        username: 'nuevoUsuario',
        password: 'contraseña123',
    };

    try {
      await auth.post(REGISTER_URL, existingUser);
      // Si el registro es exitoso (lo cual no debería ocurrir en este caso), la prueba debe fallar
      throw new Error('El registro de un usuario existente debería fallar');
    } catch (error) {
      // Esperamos que el backend responda con un error 4xx para indicar que ya existe el usuario
      expect(error.response.status).toBeGreaterThanOrEqual(400);
    }
  });
});
