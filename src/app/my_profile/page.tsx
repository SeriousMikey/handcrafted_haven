'use client';


export default function MyProfile() {

  const createUsers = async () => {
    const res = await fetch('api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Poo',
        password: '12345',
      }),
    });

    const data = await res.json();
  };

  return (
    <div>
      <button onClick={createUsers}>Create User</button>
    </div>
  );
}