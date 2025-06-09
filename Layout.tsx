import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }) => (
  <div className="layout">{children}</div>
);

export default Layout;
