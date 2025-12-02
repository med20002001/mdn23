import ArticleCard from './ArticleCard';

interface Article {
  id: number;
  title: string;
  excerpt?: string;
  image: string;
  imageAlt: string;
  link: string;
  date?: string;
  category?: string;
}

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3 | 4;
}

export default function ArticleGrid({ articles, columns = 3 }: ArticleGridProps) {
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-8`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}