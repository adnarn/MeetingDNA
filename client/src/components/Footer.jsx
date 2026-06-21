import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎯</span>
            <span className="font-bold text-gray-900 dark:text-white">MeetingDNA</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Terms & Conditions
            </Link>
            <a 
              href="mailto:codewithdex@gmail.com" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Contact
            </a>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} MeetingDNA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;