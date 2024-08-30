import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../utils/jwt';

const authMiddleware = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Ajoutez les données décodées au request
    (req as any).user = decoded;

    return handler(req, res);
  };
};

export default authMiddleware;
