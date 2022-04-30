/** @format */

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
	// Token will exist if user is logged in
	const token = await getToken({ req, secret: process.env.JWT_SECRET })
	const { pathname, origin } = req.nextUrl

	if (token) {
		return NextResponse.next()
	}

	if (!token && pathname !== '/login') {
		return NextResponse.rewrite(`${origin}/login`)
	}
}
