import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/jwt';
import dbConfig from '@/lib/db';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Assurez-vous que email et password sont fournis
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Exécution de la requête SQL
    /*const users = await runQuery('SELECT * FROM users WHERE email = ?', [email]);

    // Vérification si l'utilisateur est trouvé
    if (Array.isArray(users) && users.length > 0) {
      const user = users[0];

      console.log(user)

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }

      // Création du token
      const token = signToken({ email: user.email });

      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }*/

      if (password == "1234"){
        const token = signToken({ email: "adrien.rocchetti@gmail.com", uuid:"xxxxxxxx-xxxx-xxxxxxxx-xxxxxxxxxxx" });
        return NextResponse.json({ token }, { status: 200 });
      }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

async function runQuery(query: string, params: any[] = []) {
  let connection;
  try {
    // Création de la connexion
    connection = await mysql.createConnection(dbConfig);
    console.log('Connexion réussie à la base de données');

    // Exécution de la requête
    const [results] = await connection.execute(query, params);
    
    return results as any[]; // Type assertion pour `RowDataPacket[]`
  } catch (error) {
    console.error('Erreur lors de la connexion ou de l\'exécution de la requête :', error);
    throw error; // Propagation de l'erreur pour gestion ultérieure
  } finally {
    // Fermeture de la connexion
    if (connection) {
      await connection.end();
    }
  }
}
