import { Link, useLocation, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "./../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown"


const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);


  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* logo added */}
        <Link to="/">
          <img
            src={logo}
            alt="studynotionLogo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        {/* Nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {
                  link.title === "Catalog" ? (
                    <div></div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                          }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/Signup dashboard */}
        <div className="flex gap-x-4 items-center">
          {
            user && user?.accountType != "Instructor" && (
              <Link>
                <AiOutlineShoppingCart />
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }

          {
            token == null && (
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 text-richblack-100 px-[12px] py-[8px] rounded-md">
                  Log in
                </button>
              </Link>
            )
          }

          {
            token == null && (
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 text-richblack-100 px-[12px] py-[8px] rounded-md">
                  Sign Up
                </button>
              </Link>
            )
          }
          
          {
            token !== null && <ProfileDropDown />
          }
        </div>

      </div>
    </div>
  );
};

export default Navbar;
