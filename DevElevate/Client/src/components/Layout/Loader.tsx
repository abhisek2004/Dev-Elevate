import React from 'react';

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

export default Loader;