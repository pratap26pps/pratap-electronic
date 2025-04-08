import { NextResponse} from "next/server";
import jwt from 'jsonwebtoken';
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const ispublicpath= path ==='/Account/Login' || path==='/Account/Signup'
  
 const token = request.cookies.get('token')?.value || ''
 
 if (token && ispublicpath) {
  return NextResponse.redirect(new URL('/Account/profile', request.nextUrl));
}

const isProtectedPath = path === '/upload' || path === '/upload/category' || path==='/Account/profile';
 if(!token && isProtectedPath){
  return NextResponse.redirect(new URL('/Account/Login',request.nextUrl) )
 }
 return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/Account/profile',
    '/Account/Login',
    '/Account/Signup',
    '/upload',
    '/upload/category'
  ]
}

export async function verifySeller(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'owner') return Response.json({ message: 'Forbidden' }, { status: 403 });
    return decoded;
  } catch (error) {
    return Response.json({ message: 'Invalid Token' }, { status: 401 });
  }
}

 

 

 

