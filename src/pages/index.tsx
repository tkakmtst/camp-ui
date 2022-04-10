import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyBO0GQoCdwXXz23sjNWd2bD0aYJVeR0Rq8',
  authDomain: 'camp-7089a.firebaseapp.com',
  projectId: 'camp-7089a',
  storageBucket: 'camp-7089a.appspot.com',
  messagingSenderId: '252304067317',
  appId: '1:252304067317:web:514fa35d638fb735add3bc',
};

const Home: NextPage = () => {
  const app = initializeApp(firebaseConfig);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Camp</h1>

        <p className={styles.description}>Let's Go Camp</p>

        <ul>
          <li>name = {app.name}</li>
          <li>appId = {app.options.appId}</li>
          <li>apiKey = {app.options.apiKey}</li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <a href='' rel='noopener noreferrer'>
          Powered by
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Weekends' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
