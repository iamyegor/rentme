import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="bg-gray-300 h-[50px] flex justify-between items-center px-12">
        <div className="flex items-center space-x-8">
          <Link
            className="text-green-500 font-bold text-2xl hover:text-green-600 transition active:scale-110"
            to="/"
            data-testid="home-link"
          >
            #RENTME
          </Link>
          <Link className="nav-item" to="/cars" data-testid="cars-link">
            Cars
          </Link>
        </div>
        <div className="flex space-x-8">
          <Link to="/about" data-testid="about-link">
            About
          </Link>
          <Link to="/profile" data-testid="profile-link">
            Profile
          </Link>
        </div>
      </nav>
      <div className="bg-gray-500"></div>
      <Outlet />
    </>
  );
}
