'use client';

import { useEffect, useState } from 'react';
import styles from "../ui/home.module.css";
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


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'sales' | 'price'>('sales');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/product?sort=${sortBy}&order=${order}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError('Error loading products');
        console.error(err);
      }
    };

    fetchProducts();
  }, [sortBy, order]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newOrder] = e.target.value.split(':') as [typeof sortBy, typeof order];
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className={styles.title}>- Catalog -</h1>

      <div className={styles.filterContainer}>
        <label htmlFor="sort">Sort By: </label>
        <select id="sort" onChange={handleSortChange} defaultValue="sales:desc">
          <option value="sales:desc">Sales (High to Low)</option>
          <option value="sales:asc">Sales (Low to High)</option>
          <option value="price:desc">Price (High to Low)</option>
          <option value="price:asc">Price (Low to High)</option>
        </select>
      </div>

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
