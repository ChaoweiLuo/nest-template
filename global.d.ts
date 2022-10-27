declare namespace Express {
  interface Request {
    user: User;
  }
}

/**
 * 用户
 */
interface User {
  phone: string;
  id: string;
  role: number;
}