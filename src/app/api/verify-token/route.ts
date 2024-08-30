import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../utils/jwt';

export async function POST(req: NextRequest) {
  try {
    // Récupération du token depuis les en-têtes de la requête
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Vérification du token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Réponse avec les données décodées du token
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
