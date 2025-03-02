import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from './db';
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || '';




const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ msg: 'Token not provided or invalid format' });
    }
    const token = authHeader.split(' ')[1];
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return res.status(403).json({ msg: 'Unauthorized: Invalid token' });
    }
    const username: string | undefined = decodedToken.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    req.params.userid = user._id;

    next();
  } catch (e) {
    console.error(e);
    return res.status(403).json({ msg: 'Unauthorized: Invalid or missing token' });
  }
};

export { authMiddleware };
