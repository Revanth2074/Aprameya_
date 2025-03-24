import { Link } from 'wouter';
import { BlogPost } from '../lib/types';

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostComponent = ({ post }: BlogPostProps) => {
  return (
    <div className="grid md:grid-cols-5 gap-6 items-start">
      <div className="md:col-span-2 h-48 md:h-full bg-muted rounded-lg overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="md:col-span-3">
        <div className="flex items-center space-x-4 mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
            {post.category}
          </span>
          <span className="text-foreground/60 text-sm">{post.date}</span>
        </div>
        <h2 className="font-space font-bold text-2xl mb-3">{post.title}</h2>
        <p className="text-foreground/70 mb-4">
          {post.excerpt}
        </p>
        <Link href={`/blogs/${post.id}`}>
          <a className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors">
            Read Full Article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostComponent;
