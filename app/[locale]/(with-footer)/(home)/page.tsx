import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import Faq from '@/components/Faq';
import SearchForm from '@/components/home/SearchForm';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from './Tag';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './',
    },
  };
}

export const revalidate = RevalidateOneHour;

export default async function Page() {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase.from('web_navigation').select().order('collection_time', { ascending: false }).limit(12),
  ]);

  return (
    <div className='relative w-full bg-gradient-to-b from-gray-50 to-white'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8 flex flex-col text-center lg:mx-auto lg:my-16 lg:gap-3'>
          <h1 className='text-3xl font-bold text-gray-900 lg:text-6xl'>{t('title')}</h1>
          <h2 className='text-balance text-base text-gray-600 lg:text-xl'>{t('subTitle')}</h2>
        </div>
        <div className='flex w-full items-center justify-center'>
          <SearchForm />
        </div>
        <div className='mb-10 mt-5'>
          <TagList
            data={categoryList!.map((item) => ({
              id: String(item.id),
              name: item.name,
              href: `/category/${item.name}`,
            }))}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <h2 className='text-center text-[18px] lg:text-[32px]'>{t('ai-navigate')}</h2>
          <WebNavCardList dataList={navigationList!} />
          <Link
            href='/explore'
            className='mx-auto mb-8 flex w-fit items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-3 text-base text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600'
          >
            {t('exploreMore')}
            <CircleChevronRight className='size-5' />
          </Link>
        </div>
        <Faq />
        <ScrollToTop />
      </div>
    </div>
  );
}
