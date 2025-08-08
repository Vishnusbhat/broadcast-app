import { useContext } from "react";
import ViewContext from './viewcontext'

export function useView() {
  return useContext(ViewContext);
}