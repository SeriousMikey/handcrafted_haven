import { sql } from '@/app/query/sql';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';

// Define the interface for the Product
interface Product {
  name: string;
  description: string;
  image: string;
  price: number;
  id: number;
  seller_id: number;
  seller: string;
}

// This will be used for your page props
interface ProductPageProps {
  params: { id: string };
}

// Server component that receives params
export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = params;

  // Query the database for the product
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
        Creator:{" "}
        <Link href={`/seller/${product.seller_id}`}>
          <span>{product.seller}</span>
        </Link>
      </p>
      <p>Price: ${Number(product.price).toFixed(2)}</p>
    </div>
  );
}

// Fetching server-side props to properly type params in Next.js
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // You can access params here from context.query
  const { id } = context.params as { id: string };

  // Optionally, handle fetching the product if required in SSR
  const productResult = await sql<Product[]>`
    SELECT product.name, description, image, price, "user".id AS seller_id, "user".name AS seller
    FROM product
    JOIN "user" ON "user".id = product.user_id
    WHERE product.id = ${id}
  `;

  if (!productResult.length) {
    return { notFound: true }; // Handle not found product
  }

  return { props: { params: { id } } };
}
