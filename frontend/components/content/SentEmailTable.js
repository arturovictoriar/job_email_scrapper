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
                    <td>Offer Link</td>
                    <td>Job Board</td>
                    <td>Sent date</td>
                  </tr>
                </thead>
                {props.users}
              </table>
            </div>
            <hr className="my-1" />
            <div className="card card-shadow">
              <div className="card-block">
                {props.pagination}

              </div>
            </div>
          </div>
          {/*End Panel Projects Stats*/}
        </div>

      </div>
    </div>

  )
}