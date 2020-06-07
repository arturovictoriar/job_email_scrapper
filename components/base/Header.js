
export default function HeaderComponent() {
  return (
    <div>
      {/* Navegation */}
      <nav
        className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega navbar-inverse"
        role="navigation" style={{ backgroundColor: '#27292D' }}
      >
        {/* Navbar mobile */}
        <div className="navbar-header">
          <div
            className="navbar-brand navbar-brand-center site-gridmenu-toggle"
            data-toggle="gridmenu"
          >
            <img
              className="navbar-brand-logo"
              src="../assets/images/logo-torre-transp.png"
              title="Torre"
            />
            <span className="navbar-brand-text hidden-xs-down"> Torre</span>
          </div>
          <button
            type="button"
            className="navbar-toggler collapsed"
            data-target="#site-navbar-search"
            data-toggle="collapse"
          >
            <span className="sr-only">Toggle Search</span>
            <i className="icon md-search" aria-hidden="true"></i>
          </button>
        </div>
        {/* End Navbar mobile */}
        {/* Navbar Toolbar */}
        <div className="navbar-container container-fluid">
          <div
            className="collapse navbar-collapse navbar-collapse-toolbar"
            id="site-navbar-collapse"
          >

            <ul className="nav navbar-toolbar">
              <li className="nav-item dropdown dropdown-fw dropdown-mega">
              </li>
            </ul>
            <div className="navbar-brand navbar-brand-center">
              <a href="index.html">
                <img
                  className="navbar-brand-logo navbar-brand-logo-normal"
                  src="../assets/images/logo-torre-transp.png"
                  title="Torre"
                />
                <img
                  className="navbar-brand-logo navbar-brand-logo-special"
                  src="../assets/images/logo-torre-transp.png"
                  title="Torre"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* End Navbar Toolbar */}
    </div>
  )
}