import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <div className="container mx-auto grid min-h-screen grid-rows-layout">
      <Header />
      <div className="w-full h-full">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
