import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure in production, not in development
    sameSite: 'strict', // or 'lax' if needed for third-party context
    maxAge: 24 * 60 * 60 * 1000, // 01 day
  });
  return token;
};

export default generateToken;
