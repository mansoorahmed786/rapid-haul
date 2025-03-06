'use client';
import styles from './page.module.css';
import MainPage from '@/components/MainPage';
import CustomFooter from '@/components/Footer';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MainPage />
      </main>
      <footer className={styles.footer}>
        <CustomFooter />
      </footer>
    </div>
  );
}
