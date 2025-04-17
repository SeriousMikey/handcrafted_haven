import { signOut } from '@/auth';


export default function MyProfile() {
  return (
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
  )
  
  
}