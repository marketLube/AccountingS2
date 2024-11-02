function Remider() {
  return (
    <div>
      <div className="remindercard">
        <h2 className="remindertitle">New Reminder</h2>

        <form>
          <div className="formrow">
            <div className="formgroup">
              <select className="formselect">
                <option value="">Select category</option>
                <option value="personal">ooo</option>
                <option value="work">ccc</option>
              </select>
            </div>

            <div className="formgroup">
              <select className="formselect">
                <option value="">Select Particular</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </div>

          <div className="formrow">
            <div className="formgroup">
              <input type="text" placeholder="Purpose" className="forminput" />
            </div>

            <div className="formgroup">
              <input
                type="number"
                placeholder="Amount"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input className="form-input" />
            </div>

            <div className="form-group">
              <input type="text" placeholder="Branch" className="form-input" />
            </div>
          </div>

          <div className="form-group full-width">
            <input type="text" placeholder="Status" className="form-input" />
          </div>

          <div className="form-group full-width">
            <input type="text" placeholder="Remark" className="form-input" />
          </div>

          <div className="button-group">
            <button type="button" className="clear-button">
              Clear
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Remider;
