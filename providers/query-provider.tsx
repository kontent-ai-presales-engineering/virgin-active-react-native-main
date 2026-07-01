import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchInterval: 15000,
  //   },
  // },
  // use refetchInterval when want to refetch data for automatic preview content
});

type QueryProviderProps = {
  readonly children: ReactNode;
};

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
