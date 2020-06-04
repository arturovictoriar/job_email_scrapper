const Home = () => (
  <div>
    <h1 className="titleScrapper">EmailScrapper</h1>
    <div className="totalScrapper">
      <div>
        <p>TOTAL EMAILS</p>
        <p>21324</p>
        <img src="home.jpg"></img>
      </div>
      <div>
        <p>TOTAL SENDED</p>
        <p>31324</p>
        <img src="tiket.jpg"></img>
      </div>
      <div>
        <p>NEXT SEND TIME</p>
        <p>in 3 hours</p>
        <img src="clock.jpg"></img>
      </div>
    </div>
    <div className="statScrapper">
      <p>TOP PROVIDERS</p>
      <div>PIE CHART</div>
    </div>
    <div className="lastSentScrapper">
      <p>JOB CANDIDATES</p>
      <table>
        <tr>
          <th>Jerry Mattedi</th>
          <th>
            <p>13 aug 2020</p>
            <p>Joined</p>
          </th>
          <th>
            <p>jMattedi@torre.com</p>
            <p>Un mejor empleo</p>
          </th>
          <th>
            <p>Netflix Software</p>
            <p>Engineer</p>
          </th>
          <th>Sended</th>
        </tr>
      </table>
    </div>
  </div>
);

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export default Home;
