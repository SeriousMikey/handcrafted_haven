'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


export default function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const createUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={createUsers}>
      <div>
        <h1>Please sign up to continue.</h1>

        <div>
          <label>Username</label>
          <input
            id="username"
            type="text"
            name="name"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button type="submit">Sign up</button>
      </div>
    </form>
  );
}
