import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { students, grades, subjects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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

    // Fetch student data
    const studentData = await db.query.students.findFirst({
      where: eq(students.userId, userId),
      with: {
        grades: {
          with: {
            subject: true,
          },
        },
      },
    });

    if (!studentData) {
      return new NextResponse("Student not found", { status: 404 });
    }

    return NextResponse.json(studentData);
  } catch (error) {
    console.error("Error fetching student dashboard data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}