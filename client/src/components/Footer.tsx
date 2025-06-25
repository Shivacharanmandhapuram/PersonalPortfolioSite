export default function Footer() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <footer className="border-t border-gray-200 py-12 mt-32">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-medium text-charcoal leading-tight">
              <div>Shivacharan</div>
              <div>Mandhapuram</div>
            </div>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-medium-gray">
              <div>
                <a href="#" className="hover:text-charcoal transition-colors duration-200">
                  X
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-charcoal transition-colors duration-200">
                  LinkedIn
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-charcoal transition-colors duration-200">
                  GitHub
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-charcoal transition-colors duration-200">
                  Instagram
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-charcoal transition-colors duration-200">
                  Google Scholar
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-charcoal transition-colors duration-200">
                  Substack
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
