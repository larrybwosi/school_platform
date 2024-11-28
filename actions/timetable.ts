"use server";
import { db } from "@/lib/db";

export const getTimetableSlots = async ()=>{
  // const slots = await db.query.timetableSlots.findMany({
  //   with: {
  //     grade: true,
  //     teacher: {
  //       with: {
  //         supervisor: true,
  //         subjects: true,
  //       },
  //     },
  //   },
  // });

  // return slots
  return []
}