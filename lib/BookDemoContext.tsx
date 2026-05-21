"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProductKey = "sognoscare" | "sognosroster" | "sognosgenogram" | "not-sure";

interface BookDemoContextType {
  isOpen: boolean;
  defaultProduct?: ProductKey;
  openModal: (product?: ProductKey) => void;
  closeModal: () => void;
}

const BookDemoContext = createContext<BookDemoContextType | undefined>(
  undefined,
);

export function BookDemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState<ProductKey>();

  const openModal = (product?: ProductKey) => {
    setDefaultProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <BookDemoContext.Provider value={{ isOpen, defaultProduct, openModal, closeModal }}>
      {children}
    </BookDemoContext.Provider>
  );
}

export function useBookDemo() {
  const context = useContext(BookDemoContext);
  if (!context) {
    throw new Error("useBookDemo must be used within BookDemoProvider");
  }
  return context;
}
