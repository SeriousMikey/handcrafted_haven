'use client';

import Link from 'next/link';
import styles from "@/app/ui/globals.module.css"
import Image from 'next/image';


export default function Nav() {
    return (
        <div>
            <div className={styles.top}>
                <h1 className={styles.title}>Handcrafted Haven</h1>
                <Image
                    src={'/images/teddy-bear-3599680_640.jpg'}
                    width={640}
                    height={409}
                    className={styles.image}
                    alt='Logo'
                />
            </div>
            
            <nav className={styles.nav}>
                <Link href="./" className={styles.link}><p>Home</p></Link>
                <Link href="./my_profile" className={styles.link}><p>My Profile</p></Link>
                <Link href="./catalog" className={styles.link}><p>Catalog</p></Link>
                <Link href="./about_us" className={styles.link}><p>About Us</p></Link>
            </nav>
        </div>
        
    )
}