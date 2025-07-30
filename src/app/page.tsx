import React from 'react';
import { ArrowRight, MessageCircle, Share2, Shield, Users, Eye, Lock } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden mt-10">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Receive Secret
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
              Messages Safely
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Share your unique link and let others send you secret messages. 
            Perfect for honest feedback, confessions, or just having fun with friends.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href={'/sign-up'}>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all">
                Create My Link
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-200 text-purple-600 rounded-full text-base sm:text-lg font-semibold hover:bg-purple-50 transition-all cursor-pointer">
              See How It Works
            </button>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16 lg:mb-20 border border-gray-100 mx-2 sm:mx-0">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            See It In Action
          </h3>
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
            <div className="flex-1 w-full">
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-dashed border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  Your Unique Link
                </h4>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                  <input
                    type="text"
                    value="SecretMessenge/u/xyz"
                    className="flex-1 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm"
                    readOnly
                  />
                  <button className="px-3 sm:px-4 py-2 sm:py-3 bg-black text-white rounded-lg sm:rounded-xl hover:bg-gray-800 transition-colors text-sm sm:text-base">
                    Copy
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Share this link with anyone to receive secret messages
                </p>
              </div>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center rotate-90 lg:rotate-0 cursor-pointer">
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 w-full">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Secret Messages
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg sm:rounded-xl shadow-sm">
                    <p className="text-gray-700 text-sm sm:text-base">"Great job on the presentation!"</p>
                    <span className="text-xs text-gray-400">Secret • 2 mins ago</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg sm:rounded-xl shadow-sm">
                    <p className="text-gray-700 text-sm sm:text-base">"You inspire me every day 💜"</p>
                    <span className="text-xs text-gray-400">Secret • 5 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">1. Create & Share</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Create your account and get a unique link. Share it on social media, 
              with friends, or anywhere you want to receive messages.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">2. Receive Messages</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Others can visit your link and send you secret messages without 
              revealing their identity. No account required for senders.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">3. View & Manage</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Check your dashboard to read messages, toggle message acceptance, 
              and manage your secret inbox securely.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            Why Choose SecretMessage?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">100% Secret</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Senders remain completely secret. No personal information is collected or stored.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">Secure & Private</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Your messages are encrypted and stored securely. Only you can access them.
              </p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-green-500 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">Easy to Use</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Simple interface for both receiving and sending messages. No complicated setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Receiving Secret Messages?
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 leading-relaxed">
            Join thousands of users who are already using SecretMessage to connect authentically.
          </p>
          <Link href={'/sign-up'}>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-full text-base sm:text-lg font-semibold hover:shadow-xl cursor-pointer transition-all">
              Create My Link Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-lg font-bold">SecretMessage</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Privacy</a>
              <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Terms</a>
              <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Support</a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2025 SecretMessage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
