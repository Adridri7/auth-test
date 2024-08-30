import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken, verifyToken } from '../../../utils/jwt';

const users: { email: string; password: string }[] = []; // Utilisez une base de données dans un vrai projet.

export async function POST(req: NextRequest) {
  try {
    // Vérification du token (si nécessaire pour l'enregistrement)
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    }

    // Récupération des données de la requête
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Hachage du mot de passe et enregistrement de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });

    // Génération du token pour l'utilisateur nouvellement enregistré
    const newToken = signToken({ email });

    return NextResponse.json({ token: newToken }, { status: 200 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
