import LoginForm from "../ui/login-form";
import SignupForm from "../ui/signup-form";
import styles from "@/app/ui/login.module.css"

export default function LoginPage() {
  return (
    <div className={styles.grid}>
        <LoginForm />
        <SignupForm />
    </div>
  );
}