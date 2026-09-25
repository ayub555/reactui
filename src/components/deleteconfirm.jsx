import './style.css'
import employeeService from '../services/employeeService'

function DeleteConfirm({ employee, onClose, onDeleted })
{
    function handleYes()
    {
        employeeService.deleteEmployee(employee.EmpId).then(() => {
            onDeleted()
        })
    }

    return <>
      <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content card-home">
            <div class="modal-header">
              <h5 class="modal-title">Delete Employee</h5>
              <button type="button" class="btn-close" onClick={onClose}></button>
            </div>
            <div class="modal-body">
              <p>Are you sure, you want to delete Employee {employee.EmpId}?</p>
            </div>
            <div class="modal-footer">
              <input type="button" class="btn btn-danger me-2" value="Yes" onClick={handleYes}></input>
              <input type="button" class="btn btn-secondary" value="No" onClick={onClose}></input>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show"></div>
    </>
}

export default DeleteConfirm
