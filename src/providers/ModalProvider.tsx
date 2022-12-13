import type { ChildrenProps } from "@/types";
import React, { createContext, useContext, useState } from "react";

interface ModalProviderProps {
  isOpen: boolean;
  title: string;
  body: React.ReactNode | null;
  toggleOpen: (bool: boolean) => void;
  setModal: (title: string, body: React.ReactNode, isOpen?: boolean) => void;
  resetModal: () => void;
}

const ModalContext = createContext<ModalProviderProps>(
  {} as ModalProviderProps
);

const ModalProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState<ModalProviderProps["body"]>(null);

  const toggleOpen: ModalProviderProps["toggleOpen"] = (bool) => {
    setIsOpen(bool);
  };

  const setModal: ModalProviderProps["setModal"] = (
    title,
    body,
    isOpen = true
  ) => {
    setTitle(title);
    setBody(body);
    setIsOpen(isOpen);
  };

  const resetModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setBody(null);
      setTitle("");
    }, 1000); // gracefully destroy modal
  };

  const value = {
    isOpen,
    toggleOpen,
    title,
    body,
    setModal,
    resetModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
export const useModalContext = () => useContext(ModalContext);
