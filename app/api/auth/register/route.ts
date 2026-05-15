export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server" 
import { prisma } from "@/lib/db" 
import bcrypt from "bcryptjs" 
 
export async function POST(req: NextRequest) { 
  try { 
    const { name, email, password } = await req.json() 
 
    if (!name || !email || !password) { 
      return NextResponse.json( 
        { error: "All fields required" }, 
        { status: 400 } 
      ) 
    } 
 
    const existingUser = await prisma.user.findUnique({ 
        where: { email } 
      }) 
 
    if (existingUser) { 
      return NextResponse.json( 
        { error: "Email already registered" }, 
        { status: 400 } 
      ) 
    } 
 
    const hashedPassword = await bcrypt.hash(password, 12) 
 
    const user = await prisma.user.create({ 
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role: "CUSTOMER", 
      } 
    }) 
 
    return NextResponse.json( 
      { success: true, userId: user.id }, 
      { status: 201 } 
    ) 
  } catch (error) { 
    console.error("Registration error:", error)
    return NextResponse.json( 
      { error: "Something went wrong" }, 
      { status: 500 } 
    ) 
  } 
} 
