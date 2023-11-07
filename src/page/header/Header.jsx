import { useState, useRef } from "react";
import logo from "../../component/assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef();

  const navigation = [
    { title: "Login", path: "#" },
    { title: "Register", path: "#" },
  ];

  const profileNavigation = [
    { title: "Dashboard", path: "#" },
    { title: "Settings", path: "#" },
    { title: "Log out", path: "#" },
  ];

  return (
    <nav className="bg-[#0f172a] border-b">
      <div className="max-w-screen-xl mx-auto">
        <div className="header-grid grid grid-cols-[1fr,2fr,1fr] items-center py-3 px-4 md:px-8">
          <div className="logo-container flex-none lg:flex-initial">
            <a href="#">
              <img src={logo} width={120} height={50} alt="Float UI logo" />
            </a>
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
              className={`bg-[#0f172a] absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
                isMenuOpen ? "" : "hidden"
              }`}
            >
              <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigation.map((item, idx) => (
                  <li key={idx} className="text-white hover:text-green-900">
                    <a href={item.path}>{item.title}</a>
                  </li>
                ))}
              </ul>
              <div
                className={`relative mt-5 pt-5 border-t ${
                  isMenuOpen ? "" : "hidden"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <button
                    ref={profileRef}
                    className="w-10 h-10 rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <img
                      src="https://randomuser.me/api/portraits/men/46.jpg"
                      className="w-full h-full rounded-full"
                    />
                  </button>
                  <div className="lg:hidden">
                    <span className="block">Micheal John</span>
                    <span className="block text-sm text-gray-500">
                      john@gmail.com
                    </span>
                  </div>
                </div>
                <ul
                  className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
                    isDropdownOpen ? "" : "lg:hidden"
                  }`}
                >
                  {profileNavigation.map((item, idx) => (
                    <li key={idx}>
                      <a
                        className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                        href={item.path}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
