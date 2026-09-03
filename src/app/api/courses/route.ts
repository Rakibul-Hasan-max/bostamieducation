import { NextResponse } from "next/server";
import { COURSES_DATA } from "@/constants/coursesData";

export async function GET() {
  return NextResponse.json(COURSES_DATA);
}
