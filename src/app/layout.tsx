import Nav from "./ui/nav"
import styles from "@/app/ui/globals.module.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header>
          <Nav/>
        </header>
        {children}
        <footer>

        </footer>
      </body>
    </html>
  );
}