
import React, { useState } from 'react';

interface NavbarProps {
  onLogout: () => void;
  userName: string;
  onHomeClick: () => void;
  onCreateNew: () => void;
  myResumeCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, userName, onHomeClick, onCreateNew, myResumeCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onHomeClick}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-file-invoice text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">ResuMaker<span className="text-blue-600">Pro</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <i className="fas fa-search absolute left-4 top-3 text-gray-400"></i>
            </div>
            <button onClick={onHomeClick} className="text-gray-600 hover:text-blue-600 transition-colors">Templates</button>
            <button onClick={onCreateNew} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md flex items-center gap-2">
              <i className="fas fa-plus text-xs"></i> Create New ({myResumeCount}/4)
            </button>
            <div className="flex items-center space-x-4 border-l pl-8">
              <span className="text-sm font-medium text-gray-700">Hello, {userName}</span>
              <button onClick={onLogout} className="text-gray-500 hover:text-red-500 transition-colors">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600 p-2">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full px-4 py-2 border rounded-lg text-sm mb-4"
          />
          <button onClick={() => { onHomeClick(); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Templates</button>
          <button onClick={() => { onCreateNew(); setIsMenuOpen(false); }} className="block w-full bg-blue-600 text-white py-2 rounded-lg text-center">Create New ({myResumeCount}/4)</button>
          <button onClick={onLogout} className="block w-full py-2 text-red-500 text-center font-medium">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
