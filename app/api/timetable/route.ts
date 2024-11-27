import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { timetableSlots } from "@/lib/db/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { classId, teacherSubjectId, dayOfWeek, startTime, endTime } = body;

    // Validate time slot availability
    const existingSlot = await db.query.timetableSlots.findFirst({
      where: (slots, { and, eq }) =>
        and(
          eq(slots.classId, classId),
          eq(slots.dayOfWeek, parseInt(dayOfWeek)),
          eq(slots.startTime, startTime)
        ),
    });

    if (existingSlot) {
      return new NextResponse("Time slot is already taken", { status: 400 });
    }

    const slot = await db.insert(timetableSlots).values({
      classId,
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