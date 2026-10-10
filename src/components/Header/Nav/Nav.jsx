import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <div className="nav-bar">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">AC</span>
          <span className="brand-copy">
            <strong>ASSETTO CORSA</strong>
            <span>SESSION VIEWER</span>
          </span>
        </Link>
        <div className="nav-status">
          <span className="status-indicator" aria-hidden="true" />
          LOCAL SESSION ANALYZER
        </div>
      </div>
    </nav >
)
};

export default Nav;