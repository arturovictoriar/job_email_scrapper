import LinearChart from './content/LinearChart'
import PieChart from './content/PieChart'
import SentEmailTable from './content/SentEmailTable'

export default function PageComponent(props) {
  return (
    <div>
      {/* Page */}
      <div className="page">
        <div className="page-content container-fluid">
          <LinearChart></LinearChart>
          <PieChart></PieChart>
          <SentEmailTable users={props.users} pagination={props.pagination}></SentEmailTable>
        </div>
      </div>
      {/* End Page */}
    </div>
  )
}