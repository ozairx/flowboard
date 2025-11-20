import type { Metadata } from 'next';
import {
  Fira_Code,
  Architects_Daughter,
  Geist,
  Geist_Mono,
} from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

const architectsDaughter = Architects_Daughter({
  variable: '--font-architects-daughter',
  subsets: ['latin'],
  weight: '400',
});

const georgia = localFont({
  src: [
    {
      path: '../../public/fonts/georgia/georgia.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-georgia',
});

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Flowboard - Organize seu trabalho, sua vida e tudo mais',
  description:
    'Flowboard é a ferramenta visual que permite que sua equipe gerencie qualquer tipo de projeto, fluxo de trabalho ou monitoramento de tarefas de forma intuitiva.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} ${architectsDaughter.variable} ${georgia.variable} ${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="grow">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
