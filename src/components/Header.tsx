import React, { useState } from "react";
import { clsx } from "clsx";

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header: React.FC = () => {
  const { user } = useAuth();

  const linkStyle = clsx(
    "bg-green-400 text-sm font-semibold text-black px-4 py-2 rounded hover:bg-green-500"
  );

  return (
    <header className="py-6">
      <nav className="flex items-center justify-between">
        <div className="text-3xl font-bold">
          <Link to="/" className="underline">
            EteTechnology
          </Link>
        </div>
        {user ? (
          <div className="flex gap-2 items-center">
            <Link to="/company" className={linkStyle}>
              Companies
            </Link>
            <Link to="/product" className={linkStyle}>
              Products
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
