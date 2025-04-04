import { NextResponse} from "next/server";
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const ispublicpath= path ==='/Account/Login' || path==='/Account/signup'
  
 const token = request.cookies.get('token')?.value || ''
 
 if(token && ispublicpath){
  return NextResponse.redirect(new URL('/Account/profile',request.nextUrl) )
 }
 if(!token && !ispublicpath){
  return NextResponse.redirect(new URL('/Account/Login',request.nextUrl) )
 }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/Account/profile',
    '/Account/Login',
    '/Account/signup',
  ]
}

 
