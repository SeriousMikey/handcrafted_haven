'use client';

import { useEffect, useState } from 'react';
import styles from "./ui/home.module.css";
import Link from 'next/link';

interface Product {
  name: string;
  description: string;
  image: string;
  seller_id: number;
  seller: string;
  price: number;
  id: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await fetch('/api/three_product');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError('Error loading products');
        console.error(err);
      }
    };

    fetchTopProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>- Popular Items -</h1>
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
    </div>
  );
}
