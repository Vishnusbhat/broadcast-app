import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
  getDocs,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [lastVisible, setLastVisible] = useState(null); 
  const [latestTimestamp, setLatestTimestamp] = useState(null);
  const PAGE_SIZE = 50;

  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const q = query(
        collection(db, "chats"),
        orderBy("timestamp", "desc"),
        limit(PAGE_SIZE)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docsReversed = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
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
      collection(db, "chats"),
      orderBy("timestamp", "asc"),
      startAfter(latestTs)
    );

    unsubscribeRef.current = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChats(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const filtered = newMessages.filter(m => !existingIds.has(m.id));
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
      collection(db, "chats"),
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

      setChats(prev => [...moreChats.reverse(), ...prev]); 
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }
  };

  const sendChat = useCallback(async (text, sender) => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, "chats"), {
        text,
        sender,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error sending chat message:", error);
    }
  }, []);

  const value = {
    chats,
    sendChat,
    loadMoreChats
  };

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};

export default ChatContext;
