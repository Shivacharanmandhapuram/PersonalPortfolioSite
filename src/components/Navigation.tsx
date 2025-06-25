import { Link, useLocation } from "wouter";

/**
 * Main navigation component for the portfolio website
 * Features:
 * - Responsive design with mobile-friendly spacing
 * - Active route highlighting with underline
 * - Clean typography with SF Pro Display font
 * - Sticky positioning for persistent navigation
 */
export default function Navbar() {
  const [location] = useLocation();

  /**
   * Determines if a navigation link should be highlighted as active
   * @param path - The path to check against current location
   * @returns boolean indicating if the path is active
   */
  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <div className="flex justify-center space-x-6 sm:space-x-8 lg:space-x-12">
          <Link
            href="/"
            className={`text-sm font-normal text-gray-900 hover:text-gray-600 transition-colors ${
              isActive("/") ? "underline" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/experience"
            className={`text-sm font-normal text-gray-900 hover:text-gray-600 transition-colors ${
              isActive("/experience") ? "underline" : ""
            }`}
          >
            Experience
          </Link>
          <Link
            href="/interests"
            className={`text-sm font-normal text-gray-900 hover:text-gray-600 transition-colors ${
              isActive("/interests") ? "underline" : ""
            }`}
          >
            Interests
          </Link>
          <Link
            href="/playbook"
            className={`text-sm font-normal text-gray-900 hover:text-gray-600 transition-colors ${
              isActive("/playbook") ? "underline" : ""
            }`}
          >
            Playbook
          </Link>
        </div>
      </div>
    </nav>
  );
}
