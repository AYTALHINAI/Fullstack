import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/UserSlice";
import "../App.css";



const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch();
    
    const handleSignOut = () => {
        dispatch(logout());
    };

    return (
        <Navbar
            expand="md"
            style={{
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(8px)",
                padding: "1rem 2rem"
            }}
        >
            <NavbarBrand
                tag={Link}
                to="/home"
                style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "white",
                    letterSpacing: "1px",
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    paddingLeft: "12rem"
                }}
            >
                Cake Gallery
            </NavbarBrand>

            <NavbarToggler onClick={toggle} style={{ backgroundColor: "white" }} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto d-flex align-items-center gap-4" style={{paddingRight: "12rem"}} navbar>

                    <NavItem>
                        <Link
                            to="/home"
                            className="nav-link-custom"
                        >
                            Home
                        </Link>
                    </NavItem>

                    <NavItem>
                        <Link
                            to="/about"
                            className="nav-link-custom"
                        
                        >
                            About Us
                        </Link>
                    </NavItem>

                    <NavItem>
                        <Link
                            to="/cart"
                            className="nav-link-custom"
                        >
                            Cart
                        </Link>
                    </NavItem>

                    <NavItem>
                        <Link
                            to="/profile"
                            className="nav-link-custom"
                        >
                            Profile
                        </Link>
                    </NavItem>

                    <NavItem>
                        <Link
                            to="/"
                            onClick={handleSignOut}
                            className="nav-link-custom"
                        >
                            Sign Out
                        </Link>
                    </NavItem>

                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;
