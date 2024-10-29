import Markdown from 'react-markdown';

export default function MarkdownProse({ markdown, className }: { markdown: string; className?: string }) {
  return (
    <article className='prose mx-auto max-w-pc text-gray-800'>
      <Markdown className={className}>{markdown}</Markdown>
    </article>
  );
}
