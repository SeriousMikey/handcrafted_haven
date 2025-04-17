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

// Explicitly define the type for params
interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // Query to fetch product data
  const productResult = await sql<Product[]>`
    SELECT product.name, description, image, price, "user".id AS seller_id, "user".name AS seller
    FROM product
    JOIN "user" ON "user".id = product.user_id
    WHERE product.id = ${id}
  `;

  const product = productResult[0];

  if (!product) {
    notFound(); // Trigger 404 page if no product found
  }

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        Creator:{" "}
        <Link href={`/seller/${product.seller_id}`}>
          <span>{product.seller}</span>
        </Link>
      </p>
      <p>Price: ${Number(product.price).toFixed(2)}</p>
    </div>
  );
}
