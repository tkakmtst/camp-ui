import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, FC } from 'react';

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

const app = initializeApp(firebaseConfig);

type User = {
  id: string;
  name: string;
  email: string;
};

async function getUsers(): Promise<User[]> {
  const db = getFirestore(app);
  const users = new Array<User>();
  const usersSnapShot = await getDocs(collection(db, 'users'));
  usersSnapShot.forEach((doc) => {
    const user = doc.data() as User;
    users.push({ ...user, id: doc.id });
  });

  return users;
}

type UseUserOutput = {
  isLoading: boolean;
  users: User[];
};

function useUsers(): UseUserOutput {
  const [output, setOutput] = useState({
    isLoading: true,
    users: [],
  });

  useEffect(() => {
    void (async () => {
      const users = await getUsers();
      setOutput({ isLoading: false, users });
    })();
  }, []);

  return output;
}

const UserTable: FC = () => {
  const { isLoading, users } = useUsers();
  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.id} / {user.name} / {user.email}
        </li>
      ))}
    </ul>
  );
};

const Home: NextPage = () => {
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

        <UserTable />
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
