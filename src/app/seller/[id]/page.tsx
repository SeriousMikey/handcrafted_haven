import { sql } from '@/app/query/sql';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const sellerResult = await sql`
    SELECT id, name FROM "user" WHERE id = ${id}
  `;
  const seller = sellerResult[0];

  if (!seller) {
    return <div>Seller not found.</div>;
  }

  const products = await sql`
    SELECT name, description, image, price, sales
    FROM product
    WHERE user_id = ${id}
    ORDER BY sales DESC
  `;

  return (
    <div>
      <h1>{seller.name}&apos;s Shop</h1>

      {products.length === 0 ? (
        <p>This seller has no products yet.</p>
      ) : (
        <div className={styles.popItemContainer}>
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className={styles.popItem}>
              <Link href={`/product/${product.id}`}>
                <img
                  className={styles.image}
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>
              </Link>
              <p>{product.description}</p>
              <p>
                Creator: {' '}
                <Link href={`/seller/${product.seller_id}`}>
                  <span className={styles.sellerLink}>{product.seller}</span>
                </Link>
              </p>
              <p>Price: ${Number(product.price).toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
      )}
    </div>
  );
}
