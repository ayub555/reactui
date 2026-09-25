import './style.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import employeeService from '../services/employeeService'
import formatDate from '../utils/formatDate'
import exportToXlsx from '../utils/exportToXlsx'
import EditEmp from './editemp'
import DeleteConfirm from './deleteconfirm'

// the columns shown in the grid and included in the exported files
const exportColumns = [
    { header: 'Emp Id', field: 'EmpId' },
    { header: 'First Name', field: 'firstname' },
    { header: 'Surname', field: 'surname' },
    { header: 'Phone No', field: 'phoneno' },
    { header: 'Email Id', field: 'emailId' },
    { header: 'Education', field: 'educationname' },
    { header: 'State', field: 'statename' },
    { header: 'Date of Birth', field: 'dob', isDate: true },
    { header: 'Joining Date', field: 'joindate', isDate: true }
]

// ag-grid needs its community features registered before use
ModuleRegistry.registerModules([AllCommunityModule])

// renders the Edit and Delete icons in the Action column
function ActionCellRenderer(props)
{
    function handleEdit()
    {
        props.onEdit(props.data)
    }

    function handleDelete()
    {
        props.onDelete(props.data)
    }

    return <div>
        <button class="btn btn-sm btn-outline-primary me-2" title="Edit" onClick={handleEdit}>✎</button>
        <button class="btn btn-sm btn-outline-danger" title="Delete" onClick={handleDelete}>🗑</button>
    </div>
}

function EmpAdvanceGrid()
{
    

    // holds the list of employees fetched from the API
    const [employees, setEmployees] = useState([])

    // holds the employee currently being edited, null when the popup is closed
    const [editingEmployee, setEditingEmployee] = useState(null)

    // holds the employee currently being confirmed for delete, null when the popup is closed
    const [deletingEmployee, setDeletingEmployee] = useState(null)

    function loadEmployees()
    {
        employeeService.getEmployeeDetails()
            .then((data) => setEmployees(data))
            .catch((error) => console.error('Failed to load employees:', error))
    }

    // fetch the employees once when the page loads
    useEffect(() => {
        loadEmployees()
    }, [])

    // job, education id and state id are not shown, statename/educationname are shown instead
    // every column is sortable by default, Action column is not
    const columnDefs = [
        { headerName: 'Action', cellRenderer: ActionCellRenderer, cellRendererParams: { onEdit: setEditingEmployee, onDelete: setDeletingEmployee }, sortable: false, filter: false },
        { headerName: 'Employee Id', field: 'EmpId' },
        { headerName: 'First Name', field: 'firstname' },
        { headerName: 'Surname', field: 'surname' },
        { headerName: 'Phone No', field: 'phoneno' },
        { headerName: 'Email Id', field: 'emailId' },
        { headerName: 'Education', field: 'educationname' },
        { headerName: 'State', field: 'statename' },
        { headerName: 'Date of Birth', field: 'dob', valueFormatter: (params) => formatDate(params.value) },
        { headerName: 'Joining Date', field: 'joindate', valueFormatter: (params) => formatDate(params.value) }
    ]

    //Edit Employee
    function handleEditSaved()
    {
        setEditingEmployee(null)
        loadEmployees()
    }

    //Delete Employee
    function handleDeleted()
    {
        setDeletingEmployee(null)
        loadEmployees()
    }

    //Export PDF and Excel
    // builds the rows for export using the same columns shown in the grid
    function getExportRows()
    {
        return employees.map((emp) => exportColumns.map((col) => col.isDate ? formatDate(emp[col.field]) : emp[col.field]))
    }

    function handleExportExcel()
    {
        exportToXlsx(exportColumns.map((col) => col.header), getExportRows(), 'employees.xlsx')
    }

   //Export PDF
    function handleExportPdf()
    {
        const doc = new jsPDF()
        autoTable(doc, {
            head: [exportColumns.map((col) => col.header)],
            body: getExportRows()
        })
        doc.save('employees.pdf')
    }

    //Close button
    const navigate = useNavigate() 

    function handleClose()
    {
        navigate('/')
    }

    return <div class="card card-home">
  <div class="card-header text-left d-flex justify-content-between align-items-center">
    <span>Employee Advance Grid</span>
    <div class="d-flex align-items-center">
      <a href="/new-emp" title="Add New Employee" class="me-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 2a.5.5 0 0 1 .5.5V7.5H13.5a.5.5 0 0 1 0 1H8.5V13.5a.5.5 0 0 1-1 0V8.5H2.5a.5.5 0 0 1 0-1H7.5V2.5A.5.5 0 0 1 8 2z"/>
        </svg>
      </a>
      <button type="button" class="btn btn-sm btn-outline-success me-2" title="Export to Excel" onClick={handleExportExcel}>XLS</button>
      <button type="button" class="btn btn-sm btn-outline-danger" title="Export to PDF" onClick={handleExportPdf}>PDF</button>
    </div>
   </div>
  <div class="card-body border">
    <div style={{ height: 500 }}>
      <AgGridReact
        theme={themeQuartz}
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true, resizable: true, cellStyle: { textAlign: 'left' }, headerClass: 'text-center-header' }}
        autoSizeStrategy={{ type: 'fitCellContents' }}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
      />
    </div>
  </div>
  <div class="card-footer text-body-secondary">
    <input type="button" class="btn btn-warning" value="Close" onClick={handleClose}></input>
  </div>
  {editingEmployee && (
    <EditEmp
      employee={editingEmployee}
      onClose={() => setEditingEmployee(null)}
      onSaved={handleEditSaved}
    />
  )}
  {deletingEmployee && (
    <DeleteConfirm
      employee={deletingEmployee}
      onClose={() => setDeletingEmployee(null)}
      onDeleted={handleDeleted}
    />
  )}
</div>

}

export default EmpAdvanceGrid
