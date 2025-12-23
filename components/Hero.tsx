
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Craft Your Future with Professional AI Resumes
          </h1>
          <p className="text-blue-100 text-lg">
            Build stand-out resumes in minutes using our intelligent templates. Customize content, tweak colors, and use Gemini AI to enhance your professional profile image and summaries.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition-all shadow-lg">
              View Templates
            </button>
            <button className="border-2 border-white/30 hover:bg-white/10 px-8 py-3 rounded-full transition-all flex items-center gap-2">
              <i className="fas fa-play text-xs"></i> How it Works
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/resumehero/800/500" 
              alt="App Preview" 
              className="rounded-lg shadow-inner w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl text-blue-900 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full"><i className="fas fa-check text-green-600"></i></div>
              <span className="font-bold">ATS Friendly Templates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
