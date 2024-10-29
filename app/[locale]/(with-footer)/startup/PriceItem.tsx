import { cn } from '@/lib/utils';

export default function PriceItem({ title, isFree }: { title: string; isFree: boolean }) {
  return (
    <div
      className={cn(
        'flex-center w-fit gap-1 rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-600 transition-colors',
        isFree && 'border-green-200 bg-green-50 text-green-600 font-medium',
      )}
    >
      <div className={cn('size-2 rounded-full bg-gray-400', isFree && 'bg-green-500')} />
      {title}
    </div>
  );
}
