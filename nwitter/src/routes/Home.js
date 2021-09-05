import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import firebaseApp from 'firebaseApp';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import Nweet from 'components/Nweet';

const db = getFirestore();

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    const nweetsRef = collection(db, 'nweets');
    const first = query(nweetsRef, orderBy('createdAt', 'desc'), limit(3));
    onSnapshot(first, (snapshot) => {
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      snapshot.docs.map((doc) => {
        const nweetObject = {
          ...doc.data(),
          id: doc.id,
        };

        setNweets((prev) => [...prev, nweetObject]);
        return null;
      });
    });
  }, []);

  const nextPage = async () => {
    const next = query(
      collection(db, 'nweets'),
      orderBy('createdAt', 'desc'),
      startAfter(lastVisible),
      limit(3),
    );
    const nextNweets = await getDocs(next);
    setLastVisible(nextNweets.docs[nextNweets.docs.length - 1]);
    nextNweets.forEach((doc) => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };

      setNweets((prev) => [...prev, nweetObject]);
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setNweets([]);
    try {
      await addDoc(collection(db, 'nweets'), {
        text: nweet,
        createdAt: new Date(),
        creatorId: userObj.uid,
      });
      setNweet('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet, idx) => (
          <Nweet
            key={nweet.id + idx}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            setNweets={setNweets}
          />
        ))}
        {lastVisible && <button onClick={nextPage}>더보기</button>}
      </div>
    </>
  );
};

export default Home;
