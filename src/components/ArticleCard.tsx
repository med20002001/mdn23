import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface ArticleCardProps {
  title: string;
  excerpt?: string;
  image: string;
  imageAlt: string;
  link: string;
  date?: string;
  category?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  image,
  imageAlt,
  link,
  date,
  category
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <a href={link} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={imageAlt} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {category && (
            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {category}
            </div>
          )}
        </div>
      </a>
      
      <CardHeader>
        <a href={link} className="hover:text-primary transition-colors">
          <CardTitle className="line-clamp-2 text-xl">
            {title}
          </CardTitle>
        </a>
        {date && (
          <p className="text-sm text-gray-500 mt-2">
            {new Date(date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        )}
      </CardHeader>
      
      {excerpt && (
        <CardContent className="flex-grow">
          <CardDescription className="line-clamp-3">
            {excerpt}
          </CardDescription>
        </CardContent>
      )}
      
      <CardFooter className="pt-0">
        <a href={link} className="w-full">
          <Button className="w-full" variant="default">
            Lire l'article
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}