//import globalStyles from "./ui/globals.module.css"
import styles from "./ui/home.module.css";
import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>- Popular Items -</h1>
      <div className={styles.popItemContainer}>
        <div className={styles.popItem}>
          <Link href="./catalog">
          <img className={styles.image} src="/images/teddy-bear-3599680_640.jpg" alt="Cool Teddy Bear" />
          <h3>Popular Item 1</h3>
          <p>Seller</p>
        </Link>
        </div>
        <div className={styles.popItem}>
          <Link href="./catalog">
          <img className={styles.image} src="/images/teddy-bear-524251_640.jpg" alt="Neat Teddy Bear" />
          <h3>Popular Item 2</h3>
          <p>Seller</p>
        </Link>
        </div>
        <div className={styles.popItem}>
          <Link href="./catalog">
          <img className={styles.image} src="/images/luggage-1799224_640.jpg" alt="Luggage Teddy Bear" />
          <h3>Popular Item 3</h3>
          <p>Seller</p>
        </Link>
        </div>
      </div>
    </div>
    
  );
}
