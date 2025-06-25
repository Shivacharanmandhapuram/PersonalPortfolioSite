import { motion } from "framer-motion";

/**
 * Props interface for the PlaybookPostCard component
 */
interface PlaybookPostCardProps {
  title: string;        // Blog post title
  contentSnippet: string; // Excerpt or summary of the post
  link: string;         // URL to the full blog post
  pubDate: string;      // Publication date in ISO format
  index: number;        // Used for staggered animations
}

/**
 * Individual blog post card component for the Playbook page
 * Features:
 * - Responsive layout (mobile stacks, desktop side-by-side)
 * - Framer Motion animations with staggered reveals
 * - Visual separators between posts
 * - Quote box with content preview
 * - External link handling with proper security attributes
 */
export default function PlaybookPostCard({ 
  title, 
  contentSnippet, 
  link, 
  pubDate, 
  index 
}: PlaybookPostCardProps) {
  /**
   * Formats ISO date string to human-readable format
   * @param dateString - ISO date string
   * @returns Formatted date string (e.g., "December 15, 2024")
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-b border-gray-200 pb-12 sm:pb-16 mb-12 sm:mb-16 last:border-b-0 last:pb-0 last:mb-0"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
            {contentSnippet}
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors text-xs sm:text-sm"
          >
            Read
          </a>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 sm:p-6 lg:p-8 lg:max-w-sm">
          <blockquote className="text-gray-700 italic leading-relaxed text-sm sm:text-base">
            "{contentSnippet.substring(0, 150)}..."
          </blockquote>
        </div>
      </div>
    </motion.article>
  );
}