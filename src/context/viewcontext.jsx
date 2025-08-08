import React, { createContext, useState, useEffect } from "react";

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [viewStack, setViewStack] = useState([""]);
  const [currentView, setCurrentView] = useState(
    viewStack[viewStack.length - 1]
  );
  const [userObj, setUserObj] = useState({
    userName: "",
    role: "",
    phoneNumber: ""
  });
  const pushView = (view) => {
    setViewStack((prev) => [...prev, view]);
  };
  const popView = () => {
    setViewStack((prev) => {
      const stack = [...prev];
      const newStack = stack.slice(0, -1);
      return newStack.length ? newStack : null;
    });
  };
  const setUserName = (user) => {
    setUserObj((prev) => ({ ...prev, userName: user }));
  };
  const setUserRole = (role) => {
    setUserObj((prev) => ({ ...prev, role: role }));
  };
  const setUserPhoneNumber = (phoneNumber) => {
    setUserObj((prev) => ({ ...prev, phoneNumber: phoneNumber }));
  };
  useEffect(() => {
    setCurrentView(viewStack[viewStack.length - 1]);
  }, [viewStack]);

  return (
    <ViewContext.Provider
      value={{
        ...userObj,
        currentView,
        pushView,
        popView,
        setUserName,
        setUserRole,
        setUserPhoneNumber
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
