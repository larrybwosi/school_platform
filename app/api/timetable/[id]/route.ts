import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { timetableSlots } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    await db.delete(timetableSlots).where(eq(timetableSlots.id, params.id));

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("[TIMETABLE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { gradeId, teacherId, dayOfWeek, startTime, endTime } = body;

    const slot = await db
      .update(timetableSlots)
      .set({
        gradeId,
        teacherId,
        dayOfWeek: parseInt(dayOfWeek),
        startTime,
        endTime,
      })
      .where(eq(timetableSlots.id, params.id));

    return NextResponse.json(slot);
  } catch (error) {
    console.error("[TIMETABLE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}