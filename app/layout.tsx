import { Inter,Archivo } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Providers } from '@/lib/providers';
import { createMetadata } from '@/lib/metadata';

const inter = Archivo({ subsets: ['latin'] });

export const metadata = createMetadata({
	title: {
		template: "School Management System",
		default: "Schedule Wise",
	},
	description: "Enterprise-grade school management system",
	metadataBase: new URL(process.env.BETTER_AUTH_URL || "http://localhost:3000"),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}