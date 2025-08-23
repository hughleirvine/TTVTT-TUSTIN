// File: app/api/get-calendar/route.js

import { NextResponse } from 'next/server';
import { CALENDAR_HTML } from '@/lib/static-calendar-data';

export async function GET() {
  // This function simply returns the saved HTML content.
  // It's fast, reliable, and will never fail.
  return NextResponse.json({ html: CALENDAR_HTML });
}
