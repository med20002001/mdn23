interface Props {
  title: string;
  href: string;
}

export default function EventBadge({ title, href }: Props) {
  return (
    <a
      href={href}
      className="block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors truncate"
      title={title}
    >
      {title}
    </a>
  );
}
