import Image from 'next/image';
import styles from '../ui/about_us.module.css';


export default function AboutUs() {
  return (
    <div className={styles.grid}>
      <h1>- The Guy -</h1>
      <Image
            src={"/images/myself.jpg"}
            width={1509}
            height={1436}
            className={styles.image}
            alt="Me"
      />
      <p className={styles.paragraph}>Yeah, I made this website. It was kind of interesting because I did most of it last minute, but what you're seeing is the final product. I didn't come up with the idea for this website myself, since it's for a class project, but I did most of the code and everything, with some help from nextjs.org. All of the images are free to use (I'm pretty sure) and I'm using Neon for a database.
      <br/><br/>Forgot this was an About page. My name is Michael Hyer. I a 23 year old software developer about to get his bachelor's degree. I like to play and make video games, and I am somewhat good at programming, even at 3 AM.
      <br/><br/>That's about it.
      </p>
    </div>
  );
}
