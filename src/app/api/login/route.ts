import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db';
import User from '@/app/models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Create JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({ message: 'Login successful' });

  // Set cookie
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
