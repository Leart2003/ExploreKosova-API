import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const auth = useAuth();

  function handleLogout() {
    auth.logout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ExploreKosova
        </Link>

        <div className="navbar-nav ms-auto d-flex align-items-center gap-3">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {auth.isAuthenticated && (
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
          )}

          {auth.isAdmin && (
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          )}

          {auth.isAuthenticated ? (
            <>
              <span className="text-light">Hi, {auth.user.fullName}</span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;