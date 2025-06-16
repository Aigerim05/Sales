
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-gray-200 border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">
              Product
            </h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">
              Feedback
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Help us improve by sharing your thoughts and reporting any issues.
            </p>
            <FeedbackForm
              trigger={
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Feedback
                </Button>
              }
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">
              Newsletter
            </h3>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © 2024 Sales Coach AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
