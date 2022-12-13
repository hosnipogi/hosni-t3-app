import React from "react";
import { SessionProvider as _SessionProvider } from "next-auth/react";
import type { ChildrenProps } from "@/types";
import type { Session } from "next-auth";

interface SessionProviderProps extends ChildrenProps {
  session: Session | null;
}
const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  session,
}) => {
  return <_SessionProvider session={session}>{children}</_SessionProvider>;
};

export default SessionProvider;
