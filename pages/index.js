/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unsupported-features/es-syntax */
import fetch from 'isomorphic-fetch';

import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Head from '../components/base/Head';
import PageContent from '../components/PageContent';

const App = (props) => (
  <div>
    <Head />
    <Header />
    <PageContent users={props.users} />
    <Footer />
  </div>
);

App.getInitialProps = async (ctx) => {
  const res = await fetch('http://localhost:4000');
  const data = await res.json();
  return { users: data };
};

export default App;
