import { sql } from '@/app/query/sql';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        product.name, 
        product.description, 
        product.image, 
        product.price,
        product.id,
        "user".id AS seller_id,
        "user".name AS seller
      FROM 
        product
      JOIN 
        "user" ON "user".id = product.user_id
      ORDER BY 
        product.sales DESC
      LIMIT 3
    `.execute();


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
