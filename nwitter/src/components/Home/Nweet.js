import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore();

const Nweet = ({ nweetObj, isOwner, setNweets }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState('');

  const onToggleEdit = () => {
    setEditing((prev) => !prev);
    setNewNweet(nweetObj.text);
  };

  const onDeleteClick = async () => {
    // const ok = confirm('Are you sure you want to delete this nweet');
    // if (ok) {
    // delete nweet
    await deleteDoc(doc(db, 'nweets', nweetObj.id));
    setNweets([]);
    // }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setNweets([]);
    await updateDoc(doc(db, 'nweets', nweetObj.id), {
      text: newNweet,
    });
    setEditing(false);
  };
  return (
    <>
      <div>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your nweet"
                name="newNweet"
                value={newNweet}
                required
                onChange={onChange}
              />
              <input type="submit" value="Update" />
            </form>
            <button onClick={onToggleEdit}>Cancel</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onToggleEdit}>Edit</button>
                <button onClick={onDeleteClick}>Delete</button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Nweet;
