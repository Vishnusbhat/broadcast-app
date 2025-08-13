import { useContext } from "react";
import ChatContext from "./chatcontext";

export function useChat() {
  return useContext(ChatContext);
}