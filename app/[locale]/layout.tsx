import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/home/Navigation';

import './globals.css';

import { Suspense } from 'react';

import GoogleAdScript from '@/components/ad/GoogleAdScript';
import SeoScript from '@/components/seo/SeoScript';

import Loading from './loading';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='relative mx-auto flex min-h-screen flex-col bg-gray-50 text-gray-800'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster
            position='top-center'
            toastOptions={{
              classNames: {
                error: 'bg-red-100 text-red-600',
                success: 'bg-green-100 text-green-600',
                warning: 'bg-yellow-100 text-yellow-600',
                info: 'bg-blue-100 text-blue-600',
              },
            }}
          />
          <Navigation />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>
        <SeoScript />
        <GoogleAdScript />
      </body>
    </html>
  );
}
