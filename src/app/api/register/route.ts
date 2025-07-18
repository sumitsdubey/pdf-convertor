import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/app/models/User';

export async function POST(req: Request) {
  await connectDB();

  const { name, email, phone, password } = await req.json();

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  return NextResponse.json(
    {
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    },
    { status: 201 }
  );
}
