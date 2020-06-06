import Head from 'next/head';
const Landpage = () => (
  <div>
    <Head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"
    />
    <meta name="description" content="bootstrap material admin template" />
    <meta name="author" content="" />

    <title>Sent emails statistics</title>

    <link rel="apple-touch-icon" href="/assets/images/logo-torre-transp.png" />
    <link rel="shortcut icon" href="/assets/images/logo-torre-transp.png" />

    {/* Stylesheets */}
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/assets/css/bootstrap-extend.min.css" />
    <link rel="stylesheet" href="/assets/css/site.min.css" />

    {/* Plugins */}
    <link rel="stylesheet" href="/assets/vendor/animsition/animsition.css" />
    <link
      rel="stylesheet"
      href="/assets/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.css"
    />
    <link rel="stylesheet" href="/assets/examples/css/dashboard/v1.css" />
    <link rel="stylesheet" href="/assets/examples/css/charts/chartjs.css" />

    {/* Fonts */}
    <link
      rel="stylesheet"
      href="/assets/fonts/material-design/material-design.min.css"
    />
    <link
      rel="stylesheet"
      href="/assets/fonts/brand-icons/brand-icons.min.css"
    />
    <link
      rel="stylesheet"
      href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic"
    />
    {/*
    <!--[if lt IE 9]>
      <script src="../assets/vendor/html5shiv/html5shiv.min.js"></script>
    <![endif]-->

    <!--[if lt IE 10]>
      <script src="../assets/vendor/media-match/media.match.min.js"></script>
      <script src="../assets/vendor/respond/respond.min.js"></script>
    <![endif]-->
    */}
    {/* Scripts */}
    <script src="/assets/vendor/breakpoints/breakpoints.js"></script>
    <script>
      Breakpoints();
    </script>
    </Head>
    <div>
    {/*
    <!--[if lt IE 8]>
      <p class="browserupgrade">
        You are using an <strong>outdated</strong> browser. Please
        <a href="http://browsehappy.com/">upgrade your browser</a> to improve
        your experience.
      </p>
    <![endif]-->
    */}
    {/* Navegation */}
    <nav
      className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega navbar-inverse"
      role="navigation" style={{backgroundColor: '#27292D'}}
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

    {/* Page */}
    <div className="page">
      <div className="page-content container-fluid">
        <div className="row" data-plugin="matchHeight" data-by-row="true">
          <div className="col-xl-3 col-md-6">
            {/* Widget Linearea One */}
            <div className="card card-shadow" id="widgetLineareaOne">
              <div className="card-block p-20 pt-10">
                <div className="clearfix">
                  <div className="grey-800 float-left py-10">
                    <i
                      className="icon md-account grey-600 font-size-24 vertical-align-bottom mr-5"
                    ></i>
                    Total Users
                  </div>
                  <span className="float-right grey-700 font-size-30">1,253</span>
                </div>
                <div className="mb-20 grey-500">
                  <i className="icon md-long-arrow-up green-500 font-size-16"></i>
                  15% From this yesterday
                </div>
                <div className="ct-chart h-50"></div>
              </div>
            </div>
            {/* End Widget Linearea One */}
          </div>
          <div className="col-xl-3 col-md-6">
            {/* Widget Linearea Two */}
            <div className="card card-shadow" id="widgetLineareaTwo">
              <div className="card-block p-20 pt-10">
                <div className="clearfix">
                  <div className="grey-800 float-left py-10">
                    <i
                      className="icon md-flash grey-600 font-size-24 vertical-align-bottom mr-5"
                    ></i>
                    Total Emails
                  </div>
                  <span className="float-right grey-700 font-size-30">2,425</span>
                </div>
                <div className="mb-20 grey-500">
                  <i className="icon md-long-arrow-up green-500 font-size-16"></i>
                  34.2% From this week
                </div>
                <div className="ct-chart h-50"></div>
              </div>
            </div>
            {/* End Widget Linearea Two */}
          </div>
          <div className="col-xl-3 col-md-6">
            {/* Widget Linearea Three */}
            <div className="card card-shadow" id="widgetLineareaThree">
              <div className="card-block p-20 pt-10">
                <div className="clearfix">
                  <div className="grey-800 float-left py-10">
                    <i
                      className="icon md-chart grey-600 font-size-24 vertical-align-bottom mr-5"
                    ></i>
                    Total Sent Emails
                  </div>
                  <span className="float-right grey-700 font-size-30">1,864</span>
                </div>
                <div className="mb-20 grey-500">
                  <i className="icon md-long-arrow-down red-500 font-size-16"></i>
                  15% From this yesterday
                </div>
                <div className="ct-chart h-50"></div>
              </div>
            </div>
            {/* End Widget Linearea Three */}
          </div>
          <div className="col-xl-3 col-md-6">
            {/* Widget Linearea Four */}
            <div className="card card-shadow" id="widgetLineareaFour">
              <div className="card-block p-20 pt-10">
                <div className="clearfix">
                  <div className="grey-800 float-left py-10">
                    <i
                      className="icon md-view-list grey-600 font-size-24 vertical-align-bottom mr-5"
                    ></i>
                    Items
                  </div>
                  <span className="float-right grey-700 font-size-30">845</span>
                </div>
                <div className="mb-20 grey-500">
                  <i className="icon md-long-arrow-up green-500 font-size-16"></i>
                  18.4% From this yesterday
                </div>
                <div className="ct-chart h-50"></div>
              </div>
            </div>
            {/* End Widget Linearea Four */}
          </div>
        </div>
          <div className="row justify-content-center" data-plugin="matchHeight" data-by-row="true">

          <div className="col-lg-6 col-xl-4">
            <div className="card card-shadow">
              <div className="card-block">
                {/* Example Pie */}

                <h4 className="card-title text-center">Job Providers</h4>
                {/* <p className="card-text">
                  Pie description
                </p> */}
                <canvas
                  id="exampleChartjsPie"
                  height="314"
                  width="377"
                  className="chartjs-render-monitor"
                  style={{ display: 'block', width: '377px', height: '314px' }}
                ></canvas>
              </div>
            </div>
            {/* End Example Pie */}
          </div>
      </div>
      <div className="row" data-plugin="matchHeight" data-by-row="true">
          <div className="col-xxl-12 col-lg-12">
            {/* Panel Projects Status */}
            <div className="panel" id="projects-status">
              <div className="panel-heading">
                <h3 className="panel-title">
                  Last email sent
                  {/* <span className="badge badge-pill badge-info">5</span> */}
                </h3>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Offer</td>
                      <td>Job Board</td>
                      <td>Sent date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Arturo Victoria Rincon</td>
                      <td>arvichan@gmail.com</td>

                      <td>Software engineer</td>

                      <td>
                        <span className="badge badge-primary">Un mejor empleo</span>
                      </td>
                      <td>Friday, June 5, 2020 at 12:00 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
             {/*End Panel Projects Stats*/}
          </div>
        </div>
        </div>
    </div>
    {/* End Page */}
    {/* Footer */}
    <footer className="site-footer">

      <div className="site-footer-right">
        Crafted with <i className="red-600 icon md-favorite"></i> by
        <a href="index.html"
          >FiveMinutesProblem Team</a
        >
      </div>
    </footer>
    {/* Core  */}
    <script src="/assets/vendor/babel-external-helpers/babel-external-helpers.js"></script>
    <script src="/assets/vendor/jquery/jquery.js"></script>
    <script src="/assets/vendor/popper-js/umd/popper.min.js"></script>
    <script src="/assets/vendor/bootstrap/bootstrap.js"></script>
    <script src="/assets/vendor/animsition/animsition.js"></script>
    <script src="/assets/vendor/mousewheel/jquery.mousewheel.js"></script>
    <script src="/assets/vendor/asscrollbar/jquery-asScrollbar.js"></script>
    <script src="/assets/vendor/asscrollable/jquery-asScrollable.js"></script>
    <script src="/assets/vendor/waves/waves.js"></script>

    {/* Plugins */}
    <script src="/assets/vendor/chartist/chartist.min.js"></script>
    <script src="/assets/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.js"></script>
    <script src="/assets/vendor/chart-js/Chart.js"></script>

    {/* Scripts */}
    <script src="/assets/js/Component.js"></script>
    <script src="/assets/js/Plugin.js"></script>
    <script src="/assets/js/Base.js"></script>
    <script src="/assets/js/Config.js"></script>

    <script src="/assets/js/Section/Menubar.js"></script>
    <script src="/assets/js/Section/Sidebar.js"></script>
    <script src="/assets/js/Section/PageAside.js"></script>
    <script src="/assets/js/Plugin/menu.js"></script>

    {/* Config */}
    <script src="/assets/js/config/colors.js"></script>
    <script src="/assets/js/config/tour.js"></script>
    <script>
      Config.set("assets", "../assets");
    </script>

    {/* Page */}
    <script src="/assets/js/Site.js"></script>
    <script src="/assets/js/Plugin/asscrollable.js"></script>

    <script src="/assets/js/Plugin/matchheight.js"></script>


    <script src="/assets/examples/js/dashboard/v1.js"></script>
    <script src="/assets/examples/js/charts/chartjs.js"></script>
    </div>
  </div>
);

export default Landpage;