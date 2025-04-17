import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/query/sql';


export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    const result = await sql`
      INSERT INTO "user" (name, password) 
      VALUES (${name}, ${password}) 
      RETURNING *;
    `;

    return NextResponse.json(result[0]);
  } catch (err) {
    console.error('DB insert error:', err);
    return new NextResponse('Error inserting user', { status: 500 });
  }
}