import styles from "./ui/home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <Image
          src=""
          alt=""
          width={69}
          height={69}
        />
        <h3>Login</h3>
        <nav>
          <link>My Profile</link>
          <link>Catalog</link>
          <link>About Us</link>
        </nav>
      </header>
      <main>
        <h1 className={styles.big}>Popular Items</h1>
        <div>
          <Image
            src=""
            alt=""
            width={69}
            height={69}
          />
            <Image
            src=""
            alt=""
            width={69}
            height={69}
          />
            <Image
            src=""
            alt=""
            width={69}
            height={69}
          />
        </div>
      </main>
      <footer>
        <div>

        </div>
          
        <div>
          <Image
            src=""
            alt=""
            width={69}
            height={69}
          />
            <Image
            src=""
            alt=""
            width={69}
            height={69}
          />
            <Image
            src=""
            alt=""
            width={69}
            height={69}
          />
        </div>
      </footer>
    </div>
  );
}
