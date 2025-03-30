import jwt from 'jsonwebtoken';
import { NextResponse,NextRequest } from "next/server";

export async function verifySeller(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'seller') return Response.json({ message: 'Forbidden' }, { status: 403 });
    return decoded;
  } catch (error) {
    return Response.json({ message: 'Invalid Token' }, { status: 401 });
  }
}

export function middleware(NextRequest){
  return NextResponse.redirect(new URL('/home',NextRequest.url))
}

export const config = {
  matcher:[
    '/',
    '/profile',
    '/login',
    '/signup',
    
  ]
}

 
