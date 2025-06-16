
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Mic, TrendingUp, Download } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
            Your Sales Coach{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              in the Cloud
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your sales skills with AI-powered training that adapts to your needs
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h2 className="text-3xl font-bold text-white">Choose Your Scenario</h2>
                </div>
                <p className="text-lg text-gray-300 mb-6">
                  Pick from common objections, pricing negotiations, or customize your own. Our library includes scenarios for every industry and skill level.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Cold calling simulations</li>
                  <li>• Objection handling practice</li>
                  <li>• Pricing negotiation scenarios</li>
                  <li>• Custom industry-specific situations</li>
                </ul>
              </div>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-8 w-8 text-blue-400" />
                    <CardTitle className="text-white">Scenario Library</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Access hundreds of pre-built scenarios or create your own custom training situations.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="bg-gray-800/50 border-gray-700 lg:order-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Mic className="h-8 w-8 text-purple-400" />
                    <CardTitle className="text-white">Live AI Interaction</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Our AI adapts its responses based on your conversation style and answers.
                  </CardDescription>
                </CardContent>
              </Card>
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h2 className="text-3xl font-bold text-white">Talk to AI Client</h2>
                </div>
                <p className="text-lg text-gray-300 mb-6">
                  Speak naturally. Our emotionally adaptive AI reacts in real time, providing realistic responses based on different buyer personas.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Natural voice conversations</li>
                  <li>• Emotionally intelligent responses</li>
                  <li>• Multiple buyer personas</li>
                  <li>• Real-time adaptation</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h2 className="text-3xl font-bold text-white">Improve with Feedback</h2>
                </div>
                <p className="text-lg text-gray-300 mb-6">
                  Receive voice-analysis metrics and suggested responses. Track your progress over time and identify areas for improvement.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Voice tone analysis</li>
                  <li>• Confidence scoring</li>
                  <li>• Pacing optimization</li>
                  <li>• Personalized improvement tips</li>
                </ul>
              </div>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                    <CardTitle className="text-white">Analytics Dashboard</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Detailed insights into your performance with actionable recommendations for improvement.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-8">
            Ready to Start Training?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 h-auto"
              asChild
            >
              <Link to="/signup">Try a Live Demo</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-3 h-auto"
              asChild
            >
              <Link to="/resources" className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Full Workflow PDF
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Visual Aid Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-12">
            See It In Action
          </h2>
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <Settings className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Select</h3>
                  <p className="text-sm text-gray-400">Choose your scenario</p>
                </div>
              </div>
              
              <div className="hidden md:block w-12 h-px bg-gradient-to-r from-blue-600 to-purple-600"></div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <Mic className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Practice</h3>
                  <p className="text-sm text-gray-400">Talk with AI client</p>
                </div>
              </div>
              
              <div className="hidden md:block w-12 h-px bg-gradient-to-r from-purple-600 to-pink-600"></div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Improve</h3>
                  <p className="text-sm text-gray-400">Get feedback & insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
