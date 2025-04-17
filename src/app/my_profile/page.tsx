import { signOut } from '@/auth';


export default function MyProfile() {
  //const createUsers = async () => {
  //  const res = await fetch('api/user', {
  //    method: 'POST',
  //    headers: {
  //      'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify({
  //      name: 'Poo',
  //      password: '12345',
  //    }),
  //  });
  //};
  
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/my_profile' });
        }}
      >
        <button>
          <div>Sign Out</div>
        </button>
      </form>
    </div>
    

  )
}