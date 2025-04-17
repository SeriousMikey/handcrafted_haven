'use client';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/ui/auth_form.module.css';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.formContainer}>
      <h1 className={styles.title}>Please log in to continue.</h1>

      <div className={styles.field}>
        <label className={styles.label}>Username</label>
        <input
          id="username"
          type="text"
          name="name"
          placeholder="Enter your username"
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
          required
          minLength={6}
          className={styles.input}
        />
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button type="submit" className={styles.button} aria-disabled={isPending}>
        Log in
      </button>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </form>
  );
}
