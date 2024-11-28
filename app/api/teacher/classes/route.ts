import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staff, teacherSubjects, subjects, students, grades } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Fetch teacher data with their subjects and students
    const teacherData = await db.query.staff.findFirst({
      where: eq(staff.userId, userId),
      with: {
        subjects: {
          with: {
            subject: {
              with: {
                grades: {
                  with: {
                    student: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!teacherData) {
      return new NextResponse("Teacher not found", { status: 404 });
    }

    return NextResponse.json(teacherData);
  } catch (error) {
    console.error("Error fetching teacher class data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}