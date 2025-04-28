"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
