import { sql } from '@/app/query/sql';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Product {
  name: string;
  description: string;
  image: string;
  price: number;
  id: number;
  seller_id: number;
  seller: string;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const productResult = await sql<Product[]>`
    SELECT product.name, description, image, price, "user".id AS seller_id, "user".name AS seller
    FROM product
    JOIN "user" ON "user".id = product.user_id
    WHERE product.id = ${id}
  `;

  const product = productResult[0];

  if (!product) {
    notFound();
  }

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        Creator:{' '}
        <Link href={`/seller/${product.seller_id}`}>
          <span>{product.seller}</span>
        </Link>
      </p>
      <p>Price: ${Number(product.price).toFixed(2)}</p>
    </div>
  );
}
