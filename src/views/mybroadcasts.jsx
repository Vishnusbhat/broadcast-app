import "./mybroadcasts.css";
import { useView } from "../context/useView";
import { useState, useEffect } from "react";
import { db, collection, onSnapshot } from "../firebase";

const MyBroadcasts = () => {
  const { userName } = useView();
  const [broadcasts, setBroadcasts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "broadcasts"), (snapshot) => {
      setBroadcasts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      console.log(broadcasts);
    });
    return () => unsub();
  }, []);
  return (
    <div className="my-broadcasts-container">
      <div className="my-broadcasts-heading-container">
        <div className="my-broadcasts-text">
          <div className="my-broadcasts-name">
            Hello {userName}!
            <div className="my-broadcasts-profile-container">
              <div className="my-broadcasts-profile"></div>
            </div>
          </div>
          <span className="my-broadcasts-label">Your Active Broadcasts</span>
        </div>
      </div>
      <div className="mb-broadcast-container">
        {broadcasts.length !== 0 ? (
          <div className="mb-active-broadcasts">{broadcasts.map((bc) => (
        <div key={bc.id} className="mb-broadcast-item">
          <div>{bc.label}</div>
          <div>{bc.broadcast}</div>
        </div>
      ))}</div>
        ) : (
          <div className="mb-no-active-broadcasts">
            You have no active broadcasts at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBroadcasts;
