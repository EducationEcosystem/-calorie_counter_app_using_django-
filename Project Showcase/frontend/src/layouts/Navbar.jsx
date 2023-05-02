import { Link } from "react-router-dom";
import logo from "../logo.png";


export const Navbar = () => {

    const handleClick = () => {
        localStorage.clear();
    }


    return (
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand text-light">
                    <span>
                        <img className="" src={logo} alt="logo" width="40" height="40" />
                    </span> Calorie Counter</a>
                <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <Link to="/login" onClick={handleClick} className="btn btn-success">logout</Link>
                </form>
            </div>
        </nav>
    );
}