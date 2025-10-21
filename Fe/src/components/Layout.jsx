// FE/src/components/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Main Content - No Header */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;