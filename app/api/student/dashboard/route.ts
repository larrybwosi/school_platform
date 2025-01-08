import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
 
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = parseInt(session.user.id);
    
    return NextResponse.json(userId);
  } catch (error) {
    console.error("Error fetching student dashboard data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}