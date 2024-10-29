/* eslint-disable react/jsx-no-target-blank */

import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import BaseImage from '@/components/image/BaseImage'; // 修正导入路径
import { useTranslations } from 'next-intl';

export default function WebNavCard({ title, content, url, thumbnail_url, name }: WebNavigation) {
  const t = useTranslations('Home');

  return (
    <Link href={`/ai/${name}`} title={title}>
      <div className='group flex h-[210px] flex-col gap-3 rounded-xl bg-white border border-gray-200 p-1 shadow-sm transition-all hover:border-blue-200 hover:shadow-md lg:h-[343px]'>
        <div className='relative aspect-[310/174] h-auto w-full overflow-hidden rounded-xl'>
          <BaseImage
            src={thumbnail_url || ''}
            alt={title}
            title={title}
            fill
            className='bg-gray-100 object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <div className='flex flex-col gap-2 px-[6px]'>
          <h3 className='line-clamp-1 text-base font-medium text-gray-900 lg:text-lg'>{title}</h3>
          <p className='line-clamp-3 text-sm text-gray-600 lg:text-base'>{content}</p>
        </div>
      </div>
    </Link>
  );
}
