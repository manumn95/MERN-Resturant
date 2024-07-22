import React, { useState } from "react";
import logo from "../assest/needs.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* Desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-16">
            <img src={logo} alt="logo" className=" w-24 h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-5 md:gap-7">
          <nav className="flex gap-4 md:gap-7 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"About"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <FaCartShopping />
            <div className="absolute -top-3 -right-1 text-white bg-red-500 h-4 text-sm text-center w-4 rounded-full m-0 p-0">
              0
            </div>
          </div>
          <div className="text-xl text-slate-600 " onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow">
              {userData?.image ? (
                <img
                  className="h-full w-full"
                  alt="profileImage"
                  src={userData?.image}
                />
              ) : (
                <FaUser />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white  shadow drop-shadow-md flex flex-col">
                <Link
                  to={"newProduct"}
                  className="whitespace-nowrap cursor-pointer px-2"
                >
                  New product
                </Link>
                {userData?.email ? (
                  <p
                    className="cursor-pointer text-white bg-red-600 px-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2 bg-green-600 text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
