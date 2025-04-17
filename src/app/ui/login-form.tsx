'use client';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction}>
      <div>
        <h1>
          Please log in to continue.
        </h1>
        <div>
          <div>
            <label>Username</label>
            <div>
              <input
                id="username"
                type="text"
                name="name"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button aria-disabled={isPending}>
          Log in
        </button>
        <div
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}