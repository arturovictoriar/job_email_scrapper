import LinearChart from './content/LinearChart'
import SentEmailTable from './content/SentEmailTable'


/**
 * Page Component that renders the charts and the table
 * @date 2020-06-22
 * @param {Object} props
 */
export default function PageComponent(props) {
  return (
    <div>
      {/* Page */}
      <div className="page">
        <div className="page-content container-fluid">
          <LinearChart counter={props.counter}></LinearChart>
          <SentEmailTable users={props.users} pagination={props.pagination}></SentEmailTable>
        </div>
      </div>
      {/* End Page */}
    </div>
  )
}