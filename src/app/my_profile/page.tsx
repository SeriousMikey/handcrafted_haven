import { auth, signOut } from '@/auth';
import { sql } from '@/app/query/sql';
import Link from 'next/link';
import home_styles from '@/app/ui/home.module.css';
import styles from '@/app/ui/my_profile.module.css';

export default async function MyProfile() {
  const session = await auth();

  if (!session?.user) {
    return <div>Please log in to see your profile.</div>;
  }

  const userId = session.user.id;

  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber)) {
    return <div>
      <p>Invalid user ID.</p>
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
      </div>;
  }

  const products = await sql.unsafe(`
    SELECT id, name, description, image, price, sales
    FROM product
    WHERE user_id = ${userIdNumber}
    ORDER BY sales DESC
  `);

  return (
    <div>
      <h1 className={home_styles.title}>My Profile</h1>
      <Link href={"/create_product"} className={styles.create_link}>
      <button className={styles.create}>
        <p>Create Product</p>
      </button>
      </Link>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/my_profile' });
        }}
      >
        <button className={styles.signout}>
          <div>Sign Out</div>
        </button>
      </form>
      {products.length === 0 ? (
        <p>You haven&apos;t created any products yet.</p>
      ) : (
        <div className={home_styles.popItemContainer}>
          {products.map((product) => (
            <div key={product.id} className={home_styles.popItem}>
              <Link href={`/product/${product.id}`}>
                <img
                  className={home_styles.image}
                  src={product.image}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.description}</p>
              <p>Price: ${Number(product.price).toFixed(2)}</p>
              <p>Sales: {product.sales}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
