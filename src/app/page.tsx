import globalStyles from "./ui/globals.module.css"
import styles from "./ui/home.module.css";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Popular Items</h1>
      <div>
        <div>
          <Link href="./catalog">
          <Image
            src={"/images/teddy-bear-3599680_640.jpg"}
            width={640}
            height={409}
            className={globalStyles.image}
            alt="Popular Item 1"
          />
        </Link>
        </div>
        <div>
          <Link href="./catalog">
          <Image
            src={"/images/teddy-bear-3599680_640.jpg"}
            width={640}
            height={409}
            className={globalStyles.image}
            alt="Popular Item 2"
          />
        </Link>
        </div>
        <div>
          <Link href="./catalog">
          <Image
            src={"/images/teddy-bear-3599680_640.jpg"}
            width={640}
            height={409}
            className={globalStyles.image}
            alt="Popular Item 3"
          />
        </Link>
        </div>
      </div>
    </div>
    
  );
}
