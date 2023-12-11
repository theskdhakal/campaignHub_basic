import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../login-register/UserSlice";
import { toast } from "react-toastify";
import logo from "../../component/assets/logo.png";
import profile from "../../component/assets/profile.png";

export const Header = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { posts } = useSelector((state) => state.post);

  const [searchValue, setSearchValue] = useState();
  let filteredPost = [];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOnLogout = () => {
    dispatch(setUser({}));
    toast.success("User has been logged out");
  };

  const handleOnSearch = (e) => {
    const newValue = e.target.value;

    setSearchValue(newValue);
  };

  if (searchValue) {
    filteredPost = posts.filter((item) =>
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
    <nav className="bg-[#0f172a] border-b">
      <div className="max-w-screen-xl mx-auto">
        <div className="header-grid grid grid-cols-[1fr,2fr,1fr] items-center py-3 px-4 md:px-8">
          <div className="logo-container flex-none lg:flex-initial">
            <Link to="/">
              <img src={logo} width={120} height={50} alt="Float UI logo" />
            </Link>
          </div>

          <div className="search-bar-container bordered round ml-2 lg:flex relative">
            <input
              id="searchbar"
              type="text"
              autoComplete="off"
              aria-label="search"
              placeholder="search"
              style={{ height: "40px" }}
              className="rounded mt-0 px-5 text-xl w-full"
              onChange={handleOnSearch}
            />
          </div>

          <div className="flex-1 flex items-center justify-end lg:space-x-6">
            {user?.email ? (
              <div className="relative inline-block text-left">
                <div>
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="flex items-center text-white focus:outline-none"
                  >
                    <FaUserCircle className="ml-10 mt-3 text-3xl" />
                  </button>
                </div>

                {isOpen && (
                  <div className="absolute -right-3 mt-2 w-48 bg-white border rounded shadow-lg">
                    <div className="text-center">
                      <span className="text-center">{user.fName}</span>
                    </div>
                    <hr />
                    <div className="py-1">
                      <Link
                        to={`/Dashboard/${userId}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to={`/editProfile/${userId}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Edit profile
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Post-approval
                        </Link>
                      )}
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
              <ul className="mt-2 space-y-2 lg:mt-0 lg:flex lg:space-x-6 lg:space-y-0">
                <li className="text-white hover:text-green-900">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-white hover:text-green-900">
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Display search results */}
      {searchValue && (
        <div className="max-w-screen-xl mx-auto bg-white border shadow-2xl mt-4 p-4">
          <h2 className="text-2xl font-semibold mb-2">
            Search Results for "{searchValue}":
          </h2>
          <ul className="space-y-4">
            {filteredPost.map((result) => (
              <li key={result.id} className="text-gray-800">
                {/* Display information about the search result, e.g., result.description */}
                {result.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
