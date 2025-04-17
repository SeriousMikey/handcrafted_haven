import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/query/sql';


export async function getTopThree() {
  try {
    const result = await sql`
        SELECT 
            name, description, image
        FROM 
            product
        JOIN 
            user ON user.id = product.id
        ORDER BY 
            product.sales DESC
        LIMIT 3;
    `;

    return result;
  } catch (err) {
    console.error('DB insert error:', err);
    return { status: 500 };
  }
}