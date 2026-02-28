// Base de datos temporal (en memoria)
const tempUsers = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@demo.com',
    password: '$2a$10$wH8QwQwQwQwQwQwQwQwOQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw', // 'demo123' en bcrypt
    created_at: new Date()
  },
  {
    id: 2,
    username: 'prueba',
    email: 'prueba@correo.com',
    password: '$2b$10$21NbvfMrfB4nsiG6COP0TONnKgBO9kAT3zB7p/RUa1D5mgG0fBnv.', // 'prueba123' en bcrypt
    created_at: new Date()
  }
];

export default tempUsers;
