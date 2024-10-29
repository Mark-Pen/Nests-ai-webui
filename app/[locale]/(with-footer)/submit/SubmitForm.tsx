'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { createClient } from '@/db/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FORM_PLACEHOLDER, WEBSITE_EXAMPLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinning from '@/components/Spinning';

const FormSchema = z.object({
  website: z.string(),
  url: z.string().url(),
});

export default function SubmitForm({ className }: { className?: string }) {
  const supabase = createClient();
  const t = useTranslations('Submit');

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      website: '',
      url: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    let errMsg: any = t('networkError');
    try {
      setLoading(true);
      const { error } = await supabase.from('submit').insert({
        name: formData.website,
        url: formData.url,
      });
      if (error) {
        errMsg = error.message;
        throw new Error();
      }
      toast.success(t('success'));
      form.reset();
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'mx-auto mb-8 flex max-w-[500px] flex-col justify-between rounded-xl bg-white border border-gray-200 p-6 shadow-sm lg:p-8',
          className,
        )}
      >
        <div className='space-y-6'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold text-gray-900'>{t('title')}</h2>
            <p className='mt-2 text-sm text-gray-600'>{t('subTitle')}</p>
          </div>
          
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-gray-700'>{t('website')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nests AI'
                    className='h-11 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-gray-700'>{t('url')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={FORM_PLACEHOLDER}
                    className='h-11 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-6 space-y-4'>
          <button
            type='submit'
            disabled={loading}
            className={cn(
              'flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-500 font-medium text-white transition-colors hover:bg-blue-600',
              loading && 'opacity-50 cursor-not-allowed',
            )}
          >
            {loading ? <Spinning className='size-5' /> : t('submit')}
          </button>
          
          <p className='text-center text-sm text-gray-500'>
            {t('add')} <span className='text-blue-600 font-medium'>{WEBSITE_EXAMPLE}</span> {t('text')}
          </p>
        </div>
      </form>
    </Form>
  );
}
