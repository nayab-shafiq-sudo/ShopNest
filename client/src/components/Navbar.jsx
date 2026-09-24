import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/ShopNestLogo.png";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(9,9,1,0.85)] px-4 py-3 backdrop-blur-[12px] sm:px-4 sm:py-4 md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-1.5 text-xl font-bold tracking-tighter text-white sm:gap-2 sm:text-2xl md:text-[27px]"
        >
          <img
            className="w-7 sm:w-8 md:w-9"
            src={logo}
            alt="ShopNest Logo"
          />

          ShopNest

          <span className="mb-1 ml-0.5 text-2xl text-orange-400 sm:mb-2 sm:ml-1 sm:text-3xl md:text-4xl">
            .
          </span>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-1 text-sm font-semibold sm:gap-1 sm:text-base">

          {/* Shop */}
          <li>
            <Link
              to="/"
              className="rounded-lg px-2.5 py-2 text-gray-300 transition duration-300 hover:bg-orange-400/10 hover:text-orange-400 sm:px-4"
            >
              Shop
            </Link>
          </li>

          {/* Cart */}
          {user?.role === 'user' && (

            <li>
              <Link
                to="/cart"
                className="rounded-lg relative px-2.5 py-2 text-gray-300 transition duration-300 hover:bg-orange-400/10 hover:text-orange-400 sm:px-4"
              >
                Cart
                {/* ({cartItems.length}) */}
                <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                  {cartItems.length}
                </span>
              </Link>
            </li>
          )}

          {/* User Logged In */}
          {user ? (
            <>
              {/* Profile */}
              {user.role === 'user' && (

                <li>
                  <Link
                    to="/profile"
                    className="rounded-lg px-2.5 py-2 text-gray-300 transition duration-300 hover:bg-orange-400/10 hover:text-orange-400 sm:px-4"
                  >
                    Hi, {user.name}
                  </Link>
                </li>
                
              )}

              {/* Admin */}
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin-dashboard"
                    className="rounded-lg px-2.5 py-2 text-orange-400 transition duration-300 hover:bg-orange-400/10 sm:px-4"
                  >
                    Admin
                  </Link>
                </li>
              )}

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-orange-500 px-3 py-2 text-white transition duration-300 hover:bg-orange-600 sm:px-5"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            /* Login */
            <li>
              <Link
                to="/login"
                className="rounded-lg bg-orange-500 px-3 py-2 text-white transition duration-300 hover:bg-orange-600 sm:px-5"
              >
                Login
              </Link>
            </li>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;