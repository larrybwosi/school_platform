'use client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
    <NuqsAdapter>
      <TooltipProvider>{children}</TooltipProvider>
    </NuqsAdapter>
    </QueryClientProvider>
  );
};
