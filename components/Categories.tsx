
import React from 'react';
import { CATEGORIES } from '../constants';
import { ResumeCategory } from '../types';

interface CategoriesProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Browse by Industry Style</h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        <div 
          onClick={() => onSelect('')}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all shadow-md ${selectedCategory === '' ? 'bg-blue-600 text-white scale-110' : 'bg-white text-gray-400 group-hover:bg-blue-50'}`}>
            <i className="fas fa-th-large text-2xl"></i>
          </div>
          <span className={`mt-3 font-medium ${selectedCategory === '' ? 'text-blue-600' : 'text-gray-500'}`}>All Styles</span>
        </div>
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => onSelect(cat.id)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all shadow-md ${selectedCategory === cat.id ? `${cat.color} text-white scale-110` : 'bg-white text-gray-400 group-hover:bg-gray-50'}`}>
              <i className={`fas ${cat.icon} text-2xl`}></i>
            </div>
            <span className={`mt-3 font-medium ${selectedCategory === cat.id ? 'text-gray-900' : 'text-gray-500'}`}>{cat.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
