import { createContext, useState, useEffect } from "react";
import { rtdb, ref, onValue, set, onDisconnect } from "../firebase";
import { db, collection, onSnapshot, query, where, orderBy } from "../firebase";
const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [viewStack, setViewStack] = useState(["login"]);
  const [currentView, setCurrentView] = useState();
  const [myBroadcasts, setMyBroadcasts] = useState([]);
  const [verifBroadcast, setVerifBroadcast] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [currentMyBroadcast, setCurrentMyBroadcast] = useState(null);
  const [userObj, setUserObj] = useState({
    userName: "",
    role: "",
    phoneNumber: "",
    userId: "",
    verificationThreshold: 5,
  });

  const pushView = (view) => {
    if (view !== currentView) {
      setViewStack((prev) => [...prev, view]);
    }
  };

  const popView = () => {
    setViewStack((prev) => {
      const stack = [...prev];
      const newStack = stack.slice(0, -1);
      return newStack.length ? newStack : [""];
    });
  };

  const setOpenMyBroadcast = (broadcast) => {
    setCurrentMyBroadcast(broadcast);
  };
  const setUserName = (user) =>
    setUserObj((prev) => ({ ...prev, userName: user }));
  const setUserRole = (role) => setUserObj((prev) => ({ ...prev, role: role }));
  const setUserPhoneNumber = (phoneNumber) =>
    setUserObj((prev) => ({ ...prev, phoneNumber }));
  const setUserID = (id) => setUserObj((prev) => ({ ...prev, userId: id }));

  useEffect(() => {
    setCurrentView(viewStack[viewStack.length - 1]);
  }, [viewStack]);

  useEffect(() => {
    if (!userObj.userId) return;
    console.log("userId in useeffect: " + userObj.userId);
    const connectedRef = ref(rtdb, ".info/connected");
    const userStatusRef = ref(rtdb, `status/${userObj.userId}`);

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        set(userStatusRef, {
          state: "online",
          last_changed: Date.now(),
        });

        onDisconnect(userStatusRef).set({
          state: "offline",
          last_changed: Date.now(),
        });
      }
    });

    const q = query(
      collection(db, "broadcasts"),
      orderBy("createdAt", "desc"),
      where("createdBy", "==", userObj.userName)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMyBroadcasts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => {
      unsubscribe();
      unsub();
    };
  }, [userObj.userId, userObj.userName]);

  useEffect(() => {
    const q = query(collection(db, "broadcasts"));
    const unsub = onSnapshot(q, (snapshot) => {
      setBroadcasts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      return () => {
        unsub();
      };
    });
  }, []);

  return (
    <ViewContext.Provider
      value={{
        ...userObj,
        currentMyBroadcast,
        currentView,
        pushView,
        popView,
        setUserName,
        setUserRole,
        setUserPhoneNumber,
        setUserID,
        myBroadcasts,
        setOpenMyBroadcast,
        broadcasts,
        verifBroadcast,
        setVerifBroadcast
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
