import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { STARTUP_LIST } from '@/lib/constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import PriceItem from './PriceItem';
import TagItem from './TagItem';

export default function DesktopTable() {
  const t = useTranslations('Startup.table');

  return (
    <div className='mb-10 hidden w-full lg:block'>
      <Table className='border-separate border-spacing-y-3'>
        <TableHeader>
          <TableRow className='tr-rounded h-16 rounded-lg border-none bg-gray-50 hover:bg-gray-50'>
            <TableHead className='w-[100px] text-lg font-semibold text-gray-800'>{t('da')}</TableHead>
            <TableHead className='w-[200px] text-lg font-semibold text-gray-800'>{t('website')}</TableHead>
            <TableHead className='w-[200px] text-lg font-semibold text-gray-800'>{t('tags')}</TableHead>
            <TableHead className='w-[200px] text-lg font-semibold text-gray-800'>{t('price')}</TableHead>
            <TableHead className='w-16 text-lg font-semibold text-gray-800'>{t('submission')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='space-y-3'>
          {STARTUP_LIST.map((item) => (
            <TableRow
              key={item.DA}
              className='tr-rounded h-16 rounded-lg border-none bg-white hover:bg-gray-50 transition-colors'
            >
              <TableCell className='text-base text-gray-700'>{item.DA}</TableCell>
              <TableCell className='text-lg font-medium text-gray-800'>{item.Website}</TableCell>
              <TableCell className='flex gap-1'>
                {item.Tag ? item.Tag.split(',').map((tag) => <TagItem key={tag} title={tag} />) : null}
              </TableCell>
              <TableCell>
                <PriceItem title={item.Price} isFree={item.Price.toLowerCase() === 'free'} />
              </TableCell>
              <TableCell>
                <a
                  href={item.URL}
                  target='_blank'
                  rel='noreferrer'
                  className='flex-center h-10 w-full rounded-md border border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                >
                  <SquareArrowOutUpRight className='size-5' />
                  <span className='sr-only'>{item.Website}</span>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
