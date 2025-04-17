import { sql } from '@/app/query/sql';

export async function GET() {
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

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    console.error('DB query error:', err);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
