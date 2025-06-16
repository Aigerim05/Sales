import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Mic, Brain, Users, TrendingUp, Star, Building2, Settings } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleTrySimulation = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5" />
        <div className="relative container mx-auto text-center max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Sales with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{' '}
              Practice
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Sharpen your selling skills with realistic AI conversations. Practice objection handling, 
              closing techniques, and complex negotiations in a risk-free environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={handleTrySimulation}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Try Free Simulation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Watch How It Works Section */}
      <section id="how-it-works" className={`py-20 ${
        'bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold sm:text-5xl lg:text-6xl mb-6`}>
              Watch{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto`}>
              See how AI-powered sales training transforms your conversations in real-time
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${
              'bg-gradient-to-br from-white to-gray-100 border border-gray-200'
            }`}>
              <div className="aspect-video flex items-center justify-center">
                {/* TODO: Replace with actual video embed */}
                {/* Video URL placeholder: INSERT_VIDEO_URL_HERE */}
                <div className={`text-center p-8`}>
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video will be embedded here</p>
                  <p className="text-sm mt-2 opacity-75">Coming soon...</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all text-lg px-8 py-3 h-auto"
              asChild
            >
              <Link to="/signup">Start Your Training</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Teaser */}
      <section id="features" className={`py-16 ${
        'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={`hover:shadow-lg transition-shadow ${
              'bg-white border-gray-200 shadow-sm hover:shadow-md'
            }`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    'bg-gradient-to-br from-blue-100 to-blue-200'
                  }`}>
                    <Mic className={`h-6 w-6`} />
                  </div>
                  <CardTitle>Live AI Role-Play</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Engage realistic buyer personas in real time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-lg transition-shadow ${
              'bg-white border-gray-200 shadow-sm hover:shadow-md'
            }`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    'bg-gradient-to-br from-purple-100 to-purple-200'
                  }`}>
                    <TrendingUp className={`h-6 w-6`} />
                  </div>
                  <CardTitle>Voice Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Measure tone, confidence, pacing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`hover:shadow-lg transition-shadow ${
              'bg-white border-gray-200 shadow-sm hover:shadow-md'
            }`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    'bg-gradient-to-br from-green-100 to-green-200'
                  }`}>
                    <Brain className={`h-6 w-6`} />
                  </div>
                  <CardTitle>Instant Debrief</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get AI-generated tips and scripts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Steps Section */}
      <section className={`py-20 ${
        'bg-white'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold sm:text-5xl lg:text-6xl mb-6`}>
              Your Sales Coach{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                in the Cloud
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto`}>
              Transform your sales skills with AI-powered training that adapts to your needs
            </p>
          </div>

          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    1
                  </div>
                  <h2 className={`text-3xl font-bold`}>
                    Choose Your Scenario
                  </h2>
                </div>
                <p className={`text-lg mb-6`}>
                  Pick from common objections, pricing negotiations, or customize your own. Our library includes scenarios for every industry and skill level.
                </p>
                <ul className={`space-y-2`}>
                  <li>• Cold calling simulations</li>
                  <li>• Objection handling practice</li>
                  <li>• Pricing negotiation scenarios</li>
                  <li>• Custom industry-specific situations</li>
                </ul>
              </div>
              <Card className={`hover:shadow-lg transition-shadow ${
                'bg-gradient-to-br from-white to-blue-50 border-blue-100 shadow-sm'
              }`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className={`h-8 w-8`} />
                    <CardTitle>Scenario Library</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access hundreds of pre-built scenarios or create your own custom training situations.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className={`lg:order-1 hover:shadow-lg transition-shadow ${
                'bg-gradient-to-br from-white to-purple-50 border-purple-100 shadow-sm'
              }`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Mic className={`h-8 w-8`} />
                    <CardTitle>Live AI Interaction</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our AI adapts its responses based on your conversation style and answers.
                  </CardDescription>
                </CardContent>
              </Card>
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    2
                  </div>
                  <h2 className={`text-3xl font-bold`}>
                    Talk to AI Client
                  </h2>
                </div>
                <p className={`text-lg mb-6`}>
                  Speak naturally. Our emotionally adaptive AI reacts in real time, providing realistic responses based on different buyer personas.
                </p>
                <ul className={`space-y-2`}>
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
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    3
                  </div>
                  <h2 className={`text-3xl font-bold`}>
                    Improve with Feedback
                  </h2>
                </div>
                <p className={`text-lg mb-6`}>
                  Receive voice-analysis metrics and suggested responses. Track your progress over time and identify areas for improvement.
                </p>
                <ul className={`space-y-2`}>
                  <li>• Voice tone analysis</li>
                  <li>• Confidence scoring</li>
                  <li>• Pacing optimization</li>
                  <li>• Personalized improvement tips</li>
                </ul>
              </div>
              <Card className={`hover:shadow-lg transition-shadow ${
                'bg-gradient-to-br from-white to-green-50 border-green-100 shadow-sm'
              }`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <TrendingUp className={`h-8 w-8`} />
                    <CardTitle>Analytics Dashboard</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Detailed insights into your performance with actionable recommendations for improvement.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className={`py-16 ${
        'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold sm:text-4xl`}>
              Built for Every Seller
            </h2>
            <p className={`mt-4 text-lg`}>
              From solo entrepreneurs to enterprise teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={`text-center hover:shadow-lg transition-shadow ${
              'bg-white border-gray-200 shadow-sm'
            }`}>
              <CardHeader>
                <div className={`mx-auto p-3 rounded-full w-fit ${
                  'bg-gradient-to-br from-blue-100 to-blue-200'
                }`}>
                  <Users className={`h-8 w-8`} />
                </div>
                <CardTitle>Freelancers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`mb-4`}>
                  Pitch your services like a pro.
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={
                    'border-blue-200 text-blue-700 hover:bg-blue-50'
                  } 
                  asChild
                >
                  <Link to="/who-its-for#freelancers">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className={`text-center hover:shadow-lg transition-shadow ${
              'bg-white border-gray-200 shadow-sm'
            }`}>
              <CardHeader>
                <div className={`mx-auto p-3 rounded-full w-fit ${
                  'bg-gradient-to-br from-green-100 to-green-200'
                }`}>
                  <Star className={`h-8 w-8`} />
                </div>
                <CardTitle>Interns & Entry-Level</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`mb-4`}>
                  Master your first sales call.
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={
                    'border-green-200 text-green-700 hover:bg-green-50'
                  } 
                  asChild
                >
                  <Link to="/who-its-for#entry-level">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className={`text-center hover:shadow-lg transition-shadow ${
              'bg-white border-gray-200 shadow-sm'
            }`}>
              <CardHeader>
                <div className={`mx-auto p-3 rounded-full w-fit ${
                  'bg-gradient-to-br from-purple-100 to-purple-200'
                }`}>
                  <Building2 className={`h-8 w-8`} />
                </div>
                <CardTitle>Teams & Managers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`mb-4`}>
                  Scale coaching across your org.
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={
                    'border-purple-200 text-purple-700 hover:bg-purple-50'
                  } 
                  asChild
                >
                  <Link to="/who-its-for#teams">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/who-its-for">See Your Use Case</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className={`py-16 ${
        'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold sm:text-4xl mb-4`}>
            Start free. Upgrade as you grow.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            {/* Free Trial */}
            <Card className={
              'bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            }>
              <CardHeader className="text-center">
                <CardTitle className={`text-2xl`}>Free Trial</CardTitle>
                <CardDescription className={`text-lg`}>Up to 3 simulations</CardDescription>
                <div className={`text-4xl font-bold mt-4`}>
                  $0
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`text-left space-y-3`}>
                  <p>• 3 Live Role-Plays – Try common objections, pricing talks & more</p>
                  <p>• Basic Voice Feedback – Instant insights on tone & pacing</p>
                  <p>• 2 AI Client Personas – Practice with two distinct buyer types</p>
                  <p>• Email Support – Quick answers to get you started</p>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  asChild
                >
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className={`ring-2 ${
              'bg-white border-blue-200 shadow-lg ring-blue-300 hover:shadow-xl transition-shadow'
            }`}>
              <CardHeader className="text-center">
                <CardTitle className={`text-2xl`}>Pro</CardTitle>
                <CardDescription className={`text-lg`}>30 simulations / month</CardDescription>
                <div className={`text-4xl font-bold mt-4`}>
                  $29<span className={`text-lg`}> / mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`text-left space-y-3`}>
                  <p>• 30 Live Role-Plays – Expand your practice scenarios</p>
                  <p>• Full Voice Analytics – Track tone, confidence, sentiment</p>
                  <p>• 5+ AI Personas & Custom Scenarios – Tailor practice to your deals</p>
                  <p>• Exportable Reports – Download feedback summaries & tips</p>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  asChild
                >
                  <Link to="/signup">Start Pro Plan</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Team */}
            <Card className={
              'bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            }>
              <CardHeader className="text-center">
                <CardTitle className={`text-2xl`}>Team</CardTitle>
                <CardDescription className={`text-lg`}>Per 5 users</CardDescription>
                <div className={`text-4xl font-bold mt-4`}>
                  $99<span className={`text-lg`}> / mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`text-left space-y-3`}>
                  <p>• Unlimited Simulations – Scale practice across your team</p>
                  <p>• Team & Manager Dashboard – Spot skills gaps & monitor progress</p>
                  <p>• Shared Scenario Library – Build and share best-practice scripts</p>
                  <p>• Priority Support & Onboarding – Dedicated setup and fast response</p>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  asChild
                >
                  <Link to="/contact">Request Team Demo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={`py-16 ${
        'bg-gradient-to-r from-blue-100 to-purple-100'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold sm:text-4xl mb-4`}>
            Ready to transform your sales game?
          </h2>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all text-lg px-8 py-3 h-auto" 
            asChild
          >
            <Link to="/free-trial/setup">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
