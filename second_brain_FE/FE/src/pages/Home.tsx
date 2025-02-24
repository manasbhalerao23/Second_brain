import React from 'react';
import { Brain, Search, Book, Calendar, Tag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">Second Brain</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Link to={"/signup"}>
                  Login / Signup
                </Link>
            </button>
          </div>
        </div>
      </nav>

      
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your Second Brain for
              <span className="text-indigo-600"> Better Thinking</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Capture, organize, and connect your thoughts effortlessly. Transform your ideas into actionable knowledge with our powerful second brain platform.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
              alt="Workspace with notebook and coffee"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20" id="features">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything you need to think better
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Search className="h-8 w-8 text-indigo-600" />}
              title="Smart Search"
              description="Find anything in seconds with our powerful search and filtering system."
            />
            <FeatureCard
              icon={<Book className="h-8 w-8 text-indigo-600" />}
              title="Knowledge Base"
              description="Build your personal wiki with interconnected notes and thoughts."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-indigo-600" />}
              title="Daily Journal"
              description="Capture your daily thoughts and track your progress over time."
            />
            <FeatureCard
              icon={<Tag className="h-8 w-8 text-indigo-600" />}
              title="Smart Tags"
              description="Organize your notes with intelligent tagging and categorization."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-indigo-600" />}
              title="Time Travel"
              description="Review and restore previous versions of your notes."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-indigo-600" />}
              title="AI Insights"
              description="Get smart suggestions and connections between your notes."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;