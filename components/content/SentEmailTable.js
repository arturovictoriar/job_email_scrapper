export default function PageComponent(props) {
  return (
    <div>
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
                  {
                    props.users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {/* TODO: Check if its a link */}
                        <td>
                          <a href={user.job_offers[user.job_offers.length - 1].user_offer.company} type="button" className="btn btn-danger waves-effect waves-light waves-round" target="_blank">
                            <i className="icon md-link" aria-hidden="true"></i> Link
                              </a>
                        </td>

                        <td>
                          <span className="badge badge-primary">Un mejor empleo</span>
                        </td>
                        <td> {user.job_offers[user.job_offers.length - 1].user_offer.emailSentAt} </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          {/*End Panel Projects Stats*/}
        </div>
      </div>
    </div>

  )
}