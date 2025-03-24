import { Link } from 'wouter';
import { FaArrowRight } from 'react-icons/fa';
import { blogPosts, blogCategories } from '../lib/data';
import BlogPostComponent from '../components/BlogPost';

const Blogs = () => {
  return (
    <div className="fadeIn">
      {/* Header Section */}
      <div className="diagonal-bg py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <h1 className="font-space font-bold text-3xl md:text-5xl text-white text-center mb-4">
            Blog - Insights on Autonomous Systems
          </h1>
          <p className="text-lg text-white/80 text-center max-w-3xl mx-auto">
            Stay updated with the latest trends, technologies, and breakthroughs in autonomous systems
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Blog Posts Column */}
            <div className="lg:col-span-3 space-y-10">
              {blogPosts.map((post) => (
                <BlogPostComponent key={post.id} post={post} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Categories */}
                <div className="p-6 bg-muted rounded-lg mb-6">
                  <h3 className="font-space font-bold text-xl mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {blogCategories.map((category, index) => (
                      <li key={index}>
                        <a href="#" className="text-foreground/70 hover:text-primary flex items-center transition-colors">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                          {category.name} ({category.count})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="p-6 bg-muted rounded-lg">
                  <h3 className="font-space font-bold text-xl mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 mb-1">{post.title}</h4>
                          <p className="text-foreground/60 text-xs">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
