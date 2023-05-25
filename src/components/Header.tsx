import React, { useState } from "react";
import { clsx } from "clsx";

import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const linkStyle = clsx(
    "bg-green-400 text-black px-2 py-1 rounded hover:bg-green-500"
  );

  return (
    <header className="py-6">
      <nav className="flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/">EteTechnology</Link>
        </div>
        <ul className="flex gap-2">
          <li>
            <Link to="/login" className={linkStyle}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className={linkStyle}>
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
