/**
 * Interests page component - Personal and technical interests showcase
 * Currently displays placeholder content with plans for future expansion
 * Features:
 * - Responsive layout matching site design
 * - Placeholder for future content expansion
 * - Consistent typography and spacing
 */
export default function Interests() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <section className="mt-16 sm:mt-20 mb-20 sm:mb-32">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-charcoal mb-12 sm:mb-16">
            Interests
          </h1>
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <p className="text-lg sm:text-xl text-medium-gray">
              Adding soon...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
