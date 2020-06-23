import Head from "next/head";

/**
 * Head Component that loads all the css files
 * @date 2020-06-22
 */
export default function HeadComponent() {
  return (
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

        <link rel="apple-touch-icon" href="/assets/images/logo-5-minutes-problem.png" />
        <link rel="shortcut icon" href="/assets/images/logo-5-minutes-problem.png" />

        {/* Stylesheets */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap-extend.min.css" />
        <link rel="stylesheet" href="/assets/css/site.min.css" />
        <link rel="stylesheet" href="/assets/css/pagination.css" />

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
    </div>
  )
}