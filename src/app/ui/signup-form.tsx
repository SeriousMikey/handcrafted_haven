'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from '@/app/ui/auth_form.module.css';

export default function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const createUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (!res.ok) {
        setError('Signup failed.');
      } else {
        setError('');
      }

    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong.');
    }
  };

  return (
    <form onSubmit={createUsers} className={styles.formContainer}>
      <h1 className={styles.title}>Please sign up to continue.</h1>

      <div className={styles.field}>
        <label className={styles.label}>Username</label>
        <input
          id="username"
          type="text"
          name="name"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className={styles.input}
        />
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button type="submit" className={styles.button}>Sign up</button>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}
