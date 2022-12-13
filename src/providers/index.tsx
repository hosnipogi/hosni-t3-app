import type { ChildrenProps } from "@/types";
import type { Session } from "next-auth";
import React from "react";
import ModalProvider from "./ModalProvider";
import SessionProvider from "./SessionProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProviderProps extends ChildrenProps {
  session: Session | null;
}
const Providers: React.FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider>{children}</ModalProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
};

export default Providers;
