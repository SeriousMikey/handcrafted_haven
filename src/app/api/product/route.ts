import { sql } from '@/app/query/sql';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort') ?? 'sales';
  const order = (searchParams.get('order') ?? 'desc').toUpperCase();

  const validSorts = ['sales', 'price'];
  const validOrders = ['ASC', 'DESC'];

  const sortColumn = validSorts.includes(sort) ? sort : 'sales';
  const sortOrder = validOrders.includes(order) ? order : 'DESC';


  const query = `
    SELECT 
      product.name, 
      product.description, 
      product.image,
      product.sales,
      product.price,
      product.id,
      "user".id AS seller_id,
      "user".name AS seller
    FROM 
      product
    JOIN 
      "user" ON "user".id = product.user_id
    ORDER BY 
      ${sortColumn} ${sortOrder}
  `;

  try {
    const result = await sql.unsafe(query);

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

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;
  
    if (!imageFile) {
      return NextResponse.json({ error: 'Image not provided' }, { status: 400 });
    }
  
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const base64Image = `data:${imageFile.type};base64,${imageBuffer.toString('base64')}`;
  
    try {
      await sql`
        INSERT INTO product (name, price, description, image, user_id, sales)
        VALUES (${name}, ${price}, ${description}, ${base64Image}, ${session.user.id}, 0)
      `;
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }