// File: app/api/magisterium/route.js

import { NextResponse } from 'next/server';
import { getMagisteriumData } from '@/lib/magisterium-scraper'; // Using @ for absolute import

export async function GET() {
  const data = await getMagisteriumData();
  
  if (data.error) {
    return new NextResponse(JSON.stringify(data), { status: 500 });
  }
  
  return NextResponse.json(data);
}
