import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../Button";
import {FaSignOutAlt, FaUser} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutUserMutation} from "../../redux/services/authApi.js";
import {logout} from "../../redux/slices/authSlice.js";
import {toast} from "react-toastify";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutUser] = useLogoutUserMutation();

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logout());
            toast.success("Logged Out Successfully");
            navigate("/login");
        } catch (e) {
            toast.error(e.data?.message || e.message || "Failed to logout");
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight / 2);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        {name: "About", path: "/about"},
        {name: "Auctions", path: "/Auctions"},
        {name: "Contact Us", path: "/contact"},
    ];

    return (
        <nav
            className={`
      w-full py-6 px-4 md:px-8 transition-all duration-300 
      ${
                isScrolled
                    ? "fixed top-0 bg-primary/80 backdrop-blur-lg shadow-lg"
                    : "absolute bg-primary/80"
            }
      ${isOpen ? "bg-primary" : ""}
      z-50
    `}
        >
            <div className="max-width flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-secondary z-50">
                    <img
                        src="/images/artbid_resized.png"
                        alt="logo"
                        className="rounded-lg w-[75px]"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 flex-1 justify-center">
                    {links.map((link) => (
                        <Link key={link.name} to={link.path} className="link">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {
                    user ? (<div className={`flex items-center gap-2`}>
                        <Link to={`/profile/${user._id}`}>
                            <img src={user.profileImage} alt="profileImage"
                                 className={`w-[50px] h-[50px] rounded-full`}/>
                        </Link>
                        <FaSignOutAlt size={32} className={`text-white cursor-pointer hover:text-gray-500`}
                                      onClick={handleLogout}/>
                    </div>) : (
                        <Button
                            as="a"
                            href="/login"
                            iconLeft={<FaUser size={18}/>}
                            className="hidden md:flex bg-secondary text-primary font-bold cursor-pointer transition"
                        >
                            Login
                        </Button>)
                }

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Mobile menu"
                >
                    <div className="space-y-2">
            <span
                className={`block w-8 h-0.5 bg-secondary transition-all ${
                    isOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
            />
                        <span
                            className={`block w-8 h-0.5 bg-secondary transition-all ${
                                isOpen ? "opacity-0" : ""
                            }`}
                        />
                        <span
                            className={`block w-8 h-0.5 bg-secondary transition-all ${
                                isOpen ? "-rotate-45 -translate-y-2.5" : ""
                            }`}
                        />
                    </div>
                </button>

                {/* Mobile Menu */}
                <div
                    className={`
          md:hidden fixed inset-0 bg-primary transition-all duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          pt-24 px-8
        `}
                >
                    <div className="flex flex-col items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="link"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {
                            user ? (<div className={`flex items-center gap-2`}>
                                <img src={user.profileImage} alt="profileImage"
                                     className={`w-[50px] h-[50px] rounded-full`}/>
                                <FaSignOutAlt size={32} className={`text-white cursor-pointer hover:text-gray-500`}
                                              onClick={handleLogout}/>
                            </div>) : (
                                <Button
                                    as="a"
                                    href="/login"
                                    iconLeft={<FaUser size={18}/>}
                                    className="hidden md:flex bg-secondary text-primary font-bold cursor-pointer transition"
                                >
                                    Login
                                </Button>)
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}
