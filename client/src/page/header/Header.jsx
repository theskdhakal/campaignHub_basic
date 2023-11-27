import { useState, useRef } from "react";
import logo from "../../component/assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../component/assets/profile.png";
import { setUser } from "../login-register/UserSlice";
import { toast } from "react-toastify";

export const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigation = [
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
  ];

  const profileNavigation = [
    { title: "Dashboard", path: "#" },
    { title: "Settings", path: "#" },
    { title: "Log out", path: "#" },
  ];

  const handleOnLogout = () => {
    dispatch(setUser({}));
    toast.success("User has been logged out");
  };

  return (
    <nav className="bg-[#0f172a] border-b">
      <div className="max-w-screen-xl mx-auto">
        <div className="header-grid grid grid-cols-[1fr,2fr,1fr] items-center py-3 px-4 md:px-8">
          <div className="logo-container flex-none lg:flex-initial">
            <Link to="/">
              <img src={logo} width={120} height={50} alt="Float UI logo" />
            </Link>
          </div>

          <div className="search-bar-container bordered round ml-2 lg:flex relative ">
            <input
              id="searchbar"
              type="text"
              autoComplete="off"
              aria-label="search"
              placeholder="search"
              style={{ height: "40px" }}
              className="rounded mt-0 px-5 text-xl w-full"
              // onChange={handleOnSearch}
            />
          </div>

          <div
            className="flex-1 flex items-center justify-end"
            style={{ gridColumnGap: "20px" }}
          >
            <div
              className={
                "bg-[#0f172a] absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none "
              }
            >
              {user?.email ? (
                // <Link
                //   to="/login"
                //   className="text-white hover:text-green-900 ml-5"
                // >
                //   Logout
                // </Link>

                <div className="relative inline-block text-left">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="flex items-center text-white focus:outline-none"
                    >
                      {/* <img src={profile} style={{ width: "40px" }}  /> */}

                      <FaUserCircle className="ml-10 mt-3 text-3xl" />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      <div className="text-center">
                        <span className="text-center">{user.fName}</span>
                      </div>
                      <hr />
                      <div className="py-1">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Settings
                        </a>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          onClick={handleOnLogout}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                  {navigation.map((item, idx) => (
                    <li key={idx} className="text-white hover:text-green-900 ">
                      <Link to={item.path}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
