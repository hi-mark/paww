import Link from "next/link";
import styles from "./Navbar.module.css";

//  navbarcontent can be re-used for a secondary sticky navbar which appears on scroll
export function NavbarContent() {
  return (
    <div className={styles.navContainer}>
      <Link href="" aria-label="Link to Home Page">
        <img className={styles.logo} src="/images/Logo.svg" alt="Paww Logo" />
      </Link>
      <Link href="/logout" className={styles.logOut}>
        Log Out
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className={styles.originalNav}>
      <NavbarContent />
    </nav>
  );
}
