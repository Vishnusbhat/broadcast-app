// ViewContext.js
import React, { createContext, useState, useEffect } from "react";

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [viewStack, setViewStack] = useState([""]);
  const [currentView, setCurrentView] = useState(viewStack[viewStack.length-1]);
  const pushView = (view) => {
    setViewStack((prev) => [...prev, view]);
  }
  const popView = () => {
    setViewStack((prev) => {
        const stack = [...prev];
        const newStack = stack.slice(0, -1);
        return newStack.length ? newStack : null;
    })
  }
    useEffect(() => {
    setCurrentView(viewStack[viewStack.length - 1]);
  }, [viewStack]);

  return (
    <ViewContext.Provider value={{ currentView, pushView, popView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
