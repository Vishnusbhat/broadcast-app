import { createContext, useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db as firestoreDb, rtdb } from "../firebase"; // Make sure you have both
import { ref, onValue } from "firebase/database";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [latestTimestamp, setLatestTimestamp] = useState(null);
  const PAGE_SIZE = 50;

  const unsubscribeRef = useRef(null);

  /* --------------------- Firestore: Chats --------------------- */
  useEffect(() => {
    const fetchInitialMessages = async () => {
      const q = query(
        collection(firestoreDb, "chats"),
        orderBy("timestamp", "desc"),
        limit(PAGE_SIZE)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docsReversed = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .reverse();

        setChats(docsReversed);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        const newestMsg = docsReversed[docsReversed.length - 1];
        setLatestTimestamp(newestMsg.timestamp);

        listenForNewMessages(newestMsg.timestamp);
      }
    };

    fetchInitialMessages();
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, []);

  const listenForNewMessages = (latestTs) => {
    const q = query(
      collection(firestoreDb, "chats"),
      orderBy("timestamp", "asc"),
      startAfter(latestTs)
    );

    unsubscribeRef.current = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChats((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const filtered = newMessages.filter((m) => !existingIds.has(m.id));
          if (filtered.length === 0) return prev;

          setLatestTimestamp(filtered[filtered.length - 1].timestamp);
          return [...prev, ...filtered];
        });
      }
    });
  };

  const loadMoreChats = async () => {
    if (!lastVisible) return;

    const q = query(
      collection(firestoreDb, "chats"),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const moreChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChats((prev) => [...moreChats.reverse(), ...prev]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }
  };

  const sendChat = useCallback(async (text, sender, replyTo) => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(firestoreDb, "chats"), {
        text,
        sender,
        replyTo,
        delivered: [],
        seen: [],
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error sending chat message:", error);
    }
  }, []);

  /* --------------------- RTDB: User Status --------------------- */
useEffect(() => {
  const statusRef = ref(rtdb, "status");
  const usersRef = ref(rtdb, "users");

  let statusMap = {};
  let usersMap = {};

  const unsubscribeStatus = onValue(statusRef, (statusSnap) => {
    statusMap = statusSnap.val() || {};
    combineAndSet(usersMap, statusMap); 
  });

  const unsubscribeUsers = onValue(usersRef, (usersSnap) => {
    usersMap = usersSnap.val() || {};
    combineAndSet(usersMap, statusMap);
  });

  function combineAndSet(usersData, statusData) {
    const combined = Object.keys(usersData).map((uid) => {
      const userDetails = usersData[uid] || {};
      const userStatus = statusData[uid] || {};
      return {
        id: uid,
        ...userDetails,
        status:
          userStatus.state === "online"
            ? "Online"
            : userStatus.last_changed
              ? `Last active: ${new Date(userStatus.last_changed).toLocaleString()}`
              : "Offline", 
        lastActiveTime: userStatus.last_changed || null
      };
    });
    setUsers(combined);
  }

  return () => {
    unsubscribeStatus();
    unsubscribeUsers();
  };
}, []);


  const value = {
    chats,
    sendChat,
    loadMoreChats,
    users,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
