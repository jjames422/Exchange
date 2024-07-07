
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

export async function POST(req) {
  try {
    console.log("Request received");
    const { email, password } = await req.json();
    console.log("Parsed request body:", { email, password });

    // Ensure email and password are provided
    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const client = await connectToDatabase();
    console.log("Connected to database");

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log("Database query result:", result);

    if (result.rows.length === 0) {
      client.release();
      console.log("Invalid email");
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    const user = result.rows[0];
    const isValid = await verifyPassword(password, user.password);
    console.log("Password verification result:", isValid);

    if (!isValid) {
      client.release();
      console.log("Invalid password");
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Successfully authenticated
    client.release();
    console.log("Login successful");
    return NextResponse.json({ message: 'Login successful.' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
