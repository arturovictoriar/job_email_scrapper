/* eslint-disable no-unused-vars */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import fetch from 'isomorphic-fetch';
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import Landpage from '../components/html/landpage';

const App = (props) => (
  <div>
    <Landpage users={props.users} />
  </div>
);

App.getInitialProps = async (ctx) => {
  const res = await fetch('http://localhost:4000');
  const data = await res.json();
  return { users: data };
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default App;
