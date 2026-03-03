import { atom, WritableAtom } from "jotai";
import { getStorage, setStorage, removeStorage } from "@/utils/storage";

export const tokenAtom = atom<string | null>(
  typeof window !== "undefined" ? getStorage("auth_token") : null
);

export const setTokenAtom = atom(
  null,
  (_get, set, newToken: string | null) => {
    if (typeof window !== "undefined") {
      if (newToken === null) {
        removeStorage("auth_token");
      } else {
        setStorage("auth_token", newToken);
      }
    }
    set(tokenAtom as WritableAtom<string | null, [string | null], unknown>, newToken);
  }
);
