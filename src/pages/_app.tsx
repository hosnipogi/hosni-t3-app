import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Layout from "@/components/Layout";
import Providers from "@/providers";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Providers session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
};

export default trpc.withTRPC(MyApp);
