import { motion } from "framer-motion";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import PlaybookPostCard from "@/components/PlaybookPostCard";

/**
 * Interface for individual blog post data from RSS feed
 */
interface PlaybookPost {
  title: string;          // Post title from RSS
  contentSnippet: string; // Post excerpt/summary
  link: string;           // URL to full post
  pubDate: string;        // Publication date
}

/**
 * Interface for paginated API response from /api/playbook-feed
 */
interface PlaybookFeedResponse {
  posts: PlaybookPost[];  // Array of posts for current page
  hasMore: boolean;       // Whether more pages are available
  currentPage: number;    // Current page number
  totalPosts: number;     // Total number of posts available
}

/**
 * Playbook page component - displays blog posts from Substack RSS feed
 * Features:
 * - Infinite scroll pagination
 * - Manual refresh capability
 * - Responsive design for all devices
 * - Fallback content when RSS feed fails
 * - Loading states and error handling
 */
export default function Playbook() {
  const queryClient = useQueryClient();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useInfiniteQuery<PlaybookFeedResponse>({
    queryKey: ["/api/playbook-feed"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/playbook-feed?page=${pageParam}&limit=6`);
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30 * 1000, // 30 seconds for faster updates
  });

  /**
   * Infinite scroll implementation
   * Automatically fetches next page when user scrolls near bottom
   * Triggers 1000px before reaching the actual bottom for smooth UX
   */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 && // Load when 1000px from bottom
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten all pages into a single array of posts
  const allPosts = data?.pages?.flatMap(page => page.posts) || [];

  // Fallback posts if RSS feed fails
  const fallbackPosts = [
    {
      title: "The Art of Product-Market Fit",
      contentSnippet:
        "Finding product-market fit isn't just about building features—it's about understanding the emotional connection between your solution and your users' deepest needs. Here's how we discovered it through community feedback...",
      link: "#",
      pubDate: "2024-12-15",
    },
    {
      title: "Building Communities That Scale",
      contentSnippet:
        "Growing Noobslearning to 5,000+ members taught us that community isn't just about numbers—it's about creating genuine value and fostering meaningful connections. Here are the key principles...",
      link: "#",
      pubDate: "2024-12-10",
    },
    {
      title: "Navigating Y Combinator: Lessons Learned",
      contentSnippet:
        "Y Combinator taught us that successful startups aren't just about great ideas—they're about execution, timing, and relentless focus on customer needs. Here's what we learned...",
      link: "#",
      pubDate: "2024-12-05",
    },
    {
      title: "The Psychology of User Engagement",
      contentSnippet:
        "Understanding why users engage with your product goes beyond features and functionality. It's about creating experiences that resonate on a deeper level...",
      link: "#",
      pubDate: "2024-11-28",
    },
    {
      title: "Remote-First Culture Design",
      contentSnippet:
        "Building a strong remote culture requires intentional design and clear communication protocols. Here's how we scaled our team across multiple time zones...",
      link: "#",
      pubDate: "2024-11-20",
    },
    {
      title: "Technical Storytelling for Founders",
      contentSnippet:
        "Complex technology needs simple stories. Whether pitching to investors or explaining to users, storytelling determines success. Here's our framework...",
      link: "#",
      pubDate: "2024-11-15",
    },
  ];

  const postsToDisplay = allPosts.length > 0 ? allPosts : fallbackPosts;

  /**
   * Manual refresh function for fetching latest posts
   * Invalidates cache and refetches data from RSS feed
   * Useful when new posts are published on Substack
   */
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["/api/playbook-feed"] });
    refetch();
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Refresh Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleRefresh}
            disabled={isRefetching}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors text-xs sm:text-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3 sm:w-4 h-3 sm:h-4 ${isRefetching ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRefetching ? 'Refreshing...' : 'Refresh Posts'}</span>
            <span className="sm:hidden">↻</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-full">
              Loading latest posts...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-full">
              Showing recent posts
            </div>
          </div>
        )}

        {/* Posts - Single column layout with proper spacing */}
        <div className="divide-y-0">
          {postsToDisplay.map((post, index) => (
            <PlaybookPostCard
              key={`${post.link}-${index}`}
              title={post.title}
              contentSnippet={post.contentSnippet}
              link={post.link}
              pubDate={post.pubDate}
              index={index}
            />
          ))}
        </div>

        {/* Loading indicator for infinite scroll */}
        {isFetchingNextPage && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-full">
              Loading more posts...
            </div>
          </div>
        )}

        {/* End of posts indicator */}
        {!hasNextPage && allPosts.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 text-gray-500 bg-gray-50 rounded-full text-sm">
              You've reached the end
            </div>
          </div>
        )}
      </div>
    </div>
  );
}