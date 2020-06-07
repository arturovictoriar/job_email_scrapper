export default function PageComponent(props) {
  return (
    <div>
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
    </div>

  )
}