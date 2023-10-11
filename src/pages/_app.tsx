import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
// import AdminProtection from "@/components/AdminProtection";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* <AdminProtection> */}
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="pt-16">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
      {/* </AdminProtection> */}
    </SessionProvider>
  );
}
