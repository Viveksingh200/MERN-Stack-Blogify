import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {setUser, setUserToken, navigate} = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setUserToken(null);

    navigate("/login");
  }

  return (
    <nav className="flex relative w-full items-center justify-between p-3 md:w-10/12 md:shadow md:rounded-md md:mx-auto md:sticky md:top-5 lg:w-2/3 md:bg-white">
      {/* Mobile Menu  */}
      <div
        className={`fixed md:hidden text-black transition-all duration-700 ease-in-out min-h-screen w-full top-0 left-0 bg-white p-5 z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-120"
        }`}
      >
        <X
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="absolute right-3 top-3"
        />
        <div className="flex items-center gap-2">
          <img
            src="https://cdn.dribbble.com/users/17702019/avatars/normal/90fa185fcd629784fae1eb6abed064d4.jpg?1732494002"
            alt=""
            className="size-10 rounded-full"
          />
          <span className="font-bold text-lg">Blogify</span>
        </div>

        {/* Mobile Menu Links  */}
        <div className="flex flex-col mt-32 items-center justify-center gap-8">
          <div className="">Home</div>
          <div className="">Browse</div>
          <div className="">All Tools</div>
          <button className="cursor-pointer bg-white border border-gray-200 shadow-xs p-2 px-4 rounded-md font-medium" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* 1 */}
      <div className="flex items-center gap-2">
        <img
          src="https://cdn.dribbble.com/users/17702019/avatars/normal/90fa185fcd629784fae1eb6abed064d4.jpg?1732494002"
          alt=""
          className="size-10 rounded-full"
        />
        <span className="font-bold text-lg">Blogify</span>
      </div>
      {/* 2  */}
      <div className="items-center gap-4 font-medium hidden md:flex">
        <div className="">Home</div>
        <div className="">Browse</div>
        <div className="">All Tools</div>
      </div>
      {/* 3 */}
      <div className="">
        <button className="bg-white border border-gray-200 shadow-xs p-2 px-4 rounded-md font-medium hidden md:block cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
        <Menu
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden"
        />
      </div>
    </nav>
  );
};

export default Navbar;