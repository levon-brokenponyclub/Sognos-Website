"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface EventRegistrationContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const EventRegistrationContext = createContext<
  EventRegistrationContextType | undefined
>(undefined);

export function EventRegistrationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <EventRegistrationContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </EventRegistrationContext.Provider>
  );
}

export function useEventRegistration() {
  const ctx = useContext(EventRegistrationContext);
  if (!ctx) {
    throw new Error(
      "useEventRegistration must be used within EventRegistrationProvider",
    );
  }
  return ctx;
}
