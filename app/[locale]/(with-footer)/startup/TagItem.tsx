export default function TagItem({ title }: { title: string }) {
  return (
    <div className='w-fit rounded-md border border-gray-200 px-2 py-1 text-center text-sm text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
      {title}
    </div>
  );
}
