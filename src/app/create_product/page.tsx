'use client';

import { useState } from 'react';
import styles from '@/app/ui/create_product.module.css';

export default function CreateProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      setStatus('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', imageFile);

    const res = await fetch('/api/product', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setStatus('Product created successfully!');
      setName('');
      setPrice('');
      setDescription('');
      setImageFile(null);
    } else {
      setStatus('Failed to create product.');
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Create a New Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
        <label className={styles.label}>Name:</label>
        <input className={styles.input} value={name} onChange={e => setName(e.target.value)} required />

        <label className={styles.label}>Price:</label>
        <input
          className={styles.input}
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />

        <label className={styles.label}>Description:</label>
        <textarea className={styles.textarea} value={description} onChange={e => setDescription(e.target.value)} required />

        <label className={styles.label}>Image:</label>
        <input className={styles.input} type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} required />

        <button className={styles.submit} type="submit">Create Product</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}
