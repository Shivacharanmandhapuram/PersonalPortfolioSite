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
      // For Vercel deployment, use the serverless function
      const response = await fetch(`/api/playbook-feed?page=${pageParam}&limit=6`);
      
      if (!response.ok) {
        // Fallback to working RSS feed data
        return {
          posts: [
            {
              title: "The Founder's Playbook",
              contentSnippet: "Essential insights and strategies for building successful companies. Subscribe for regular updates on entrepreneurship and technology.",
              link: "https://advaitpaliwal.substack.com",
              pubDate: new Date().toISOString()
            }
          ],
          hasMore: false,
          currentPage: pageParam,
          totalPosts: 1
        };
      }
      
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

        {/* Loading State - Show loading skeleton */}
        {isLoading && (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="mb-4 text-gray-600">
              Unable to load blog posts at the moment.
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posts - Only show when we have data and not loading */}
        {!isLoading && !error && allPosts.length > 0 && (
          <div className="divide-y-0">
            {allPosts.map((post, index) => (
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
        )}

        {/* No posts available */}
        {!isLoading && !error && allPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-600 mb-4">
              No blog posts available at the moment.
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}

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