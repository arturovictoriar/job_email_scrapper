export default function PageComponent(props) {
  return (
    <div>
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
                <span className="float-right grey-700 font-size-30">{props.counter.count.totalUsers}</span>
              </div>
              {/* <div className="mb-20 grey-500">
                <i className="icon md-long-arrow-up green-500 font-size-16"></i>
                  15% From this yesterday
                </div>
              <div className="ct-chart h-50"></div> */}
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
                    Total Sent Emails
                  </div>
                <span className="float-right grey-700 font-size-30">{props.counter.count.totalSentEmails}</span>
              </div>
              {/* <div className="mb-20 grey-500">
                <i className="icon md-long-arrow-up green-500 font-size-16"></i>
                  34.2% From this week
                </div>
              <div className="ct-chart h-50"></div> */}
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
                    Total Job Accounts Used
                  </div>
                <span className="float-right grey-700 font-size-30">{props.counter.count.totalJobAccountsScrapped}</span>
              </div>
              {/* <div className="mb-20 grey-500">
                <i className="icon md-long-arrow-down red-500 font-size-16"></i>
                  15% From this yesterday
                </div>
              <div className="ct-chart h-50"></div> */}
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
                    Total Job Providers Used
                  </div>
                <span className="float-right grey-700 font-size-30">{props.counter.count.totalJobProvidersScrapped}</span>
              </div>
              {/* <div className="mb-20 grey-500">
                <i className="icon md-long-arrow-up green-500 font-size-16"></i>
                  18.4% From this yesterday
                </div>
              <div className="ct-chart h-50"></div> */}
            </div>
          </div>
          {/* End Widget Linearea Four */}
        </div>
      </div>
    </div>
  )
}