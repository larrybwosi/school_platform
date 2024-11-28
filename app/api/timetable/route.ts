import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { timetableSlots } from "@/lib/db/schema";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { gradeId, teacherSubjectId, dayOfWeek, startTime, endTime } = body;

    // Validate time slot availability
    const existingSlot = await db.query.timetableSlots.findFirst({
      where: (slots, { and, eq }) =>
        and(
          eq(slots.gradeId, gradeId),
          eq(slots.dayOfWeek, parseInt(dayOfWeek)),
          eq(slots.startTime, startTime)
        ),
    });

    if (existingSlot) {
      return new NextResponse("Time slot is already taken", { status: 400 });
    }

    const slot = await db.insert(timetableSlots).values({
      gradeId,
      teacherSubjectId,
      dayOfWeek: parseInt(dayOfWeek),
      startTime,
      endTime,
    });

    return NextResponse.json(slot);
  } catch (error) {
    console.error("[TIMETABLE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}