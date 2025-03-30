import { Link } from 'wouter';
import { BlogPost } from '../lib/types';
import SocialShare from './SocialShare';
import { motion } from 'framer-motion';

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostComponent = ({ post }: BlogPostProps) => {
  // Create absolute URL for sharing
  const currentUrl = window.location.origin;
  const shareUrl = `${currentUrl}/blogs/${post.id}`;
  
  return (
    <motion.div 
      className="grid md:grid-cols-5 gap-6 items-start p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="md:col-span-2 h-48 md:h-full bg-muted dark:bg-slate-700 rounded-lg overflow-hidden relative group">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <SocialShare 
            url={shareUrl}
            title={`Check out this blog post: ${post.title}`}
            description={post.excerpt}
            variant="minimal"
          />
        </div>
      </div>
      <div className="md:col-span-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
              {post.category}
            </span>
            <span className="text-foreground/60 dark:text-white/60 text-sm">{post.date}</span>
          </div>
          <SocialShare 
            url={shareUrl}
            title={`Check out this blog post: ${post.title}`}
            description={post.excerpt}
          />
        </div>
        <h2 className="font-bold text-2xl mb-3 dark:text-white">{post.title}</h2>
        <p className="text-foreground/70 dark:text-white/70 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <Link href={`/blogs/${post.id}`} className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors">
            Read Full Article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-foreground/60 dark:text-white/60">By</span>
            <span className="text-sm font-medium">{post.author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostComponent;
