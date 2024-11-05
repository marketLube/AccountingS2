import { useSelector } from "react-redux";
import Branches from "./Branches";
import BranchGroup from "./BranchGroup";

export function Purpose({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="purpose">Purpose</label>
      <input
        type="text"
        id="purpose"
        {...register("purpose", {
          required: "Purpose is required",
        })}
      />
      {errors.purpose && (
        <span className="form-group-error">{errors.purpose.message}</span>
      )}
    </div>
  );
}

export function Remark({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="remark">Remark</label>
      <textarea
        id="remark"
        {...register("remark", { required: "Remark is required" })}
      ></textarea>
      {errors.remark && (
        <span className="form-group-error">{errors.remark.message}</span>
      )}
    </div>
  );
}

export function Bank({ register, errors }) {
  const { banks } = useSelector((state) => state.general);
  return (
    <div className="form-group">
      <label htmlFor="bank">Bank</label>
      <select id="bank" {...register("bank", { required: "Bank is required" })}>
        <option value="">Select Bank</option>
        {banks?.map((bank) => (
          <option value={bank.name}>{bank.name}</option>
        ))}
      </select>
      {errors.bank && (
        <span className="form-group-error">{errors.bank.message}</span>
      )}
    </div>
  );
}
// Tds Component for TDS Percent Selection
export function Tds({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="tds">TDS</label>
      <select id="tds" {...register("tds", { required: "TDS is required" })}>
        <option value="">Select TDS Percent %</option>
        <option value="0%">0%</option>
        <option value="5%">5%</option>
        <option value="10%">10%</option>
        <option value="15%">15%</option>
        <option value="20%">20%</option>
      </select>
      {errors.tds && (
        <span className="form-group-error">{errors.tds.message}</span>
      )}
    </div>
  );
}

// GstPercent Component for GST Percent Selection
export function GstPercent({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="gstPercent">GST Percent</label>
      <select
        id="gstPercent"
        {...register("gstPercent", { required: "GST Percent is required" })}
      >
        <option value="">Select GST Percent %</option>
        <option value="0%">0%</option>
        <option value="5%">5%</option>
        <option value="12%">12%</option>
        <option value="18%">18%</option>
        <option value="28%">28%</option>
      </select>
      {errors.gstPercent && (
        <span className="form-group-error">{errors.gstPercent.message}</span>
      )}
    </div>
  );
}

// Radio Component for "Type" Selection
export function Radio({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="Type" className="type-option-label">
        Type
      </label>
      <div className="type-options">
        <label className="type-option">
          <input
            type="radio"
            value="Debit"
            {...register("type", {
              required: "Select a type",
            })}
          />
          Debited
        </label>
        <label className="type-option">
          <input
            type="radio"
            value="Credit"
            {...register("type", {
              required: "Select a type",
            })}
          />
          Credited
        </label>
      </div>
      {errors.type && (
        <span className="form-group-error">{errors.type.message}</span>
      )}
    </div>
  );
}

// Gst Component for "GST Type" Selection
export function Gst({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="GstType" className="type-option-label">
        Gst
      </label>
      <div className="type-options">
        <label className="type-option">
          <input
            type="radio"
            value="incl"
            {...register("gstType", {
              required: "Select a GST type",
            })}
          />
          Inclusive
        </label>
        <label className="type-option">
          <input
            type="radio"
            value="excl"
            {...register("gstType", {
              required: "Select a GST type",
            })}
          />
          Exclusive
        </label>
      </div>
      {errors.gstType && (
        <span className="form-group-error">{errors.gstType.message}</span>
      )}
    </div>
  );
}

export function DateSel({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        {...register("date", { required: "Date is required" })}
      />
      {errors.date && (
        <span className="form-group-error">{errors.date.message}</span>
      )}
    </div>
  );
}

export function StatusSel({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="status">Status</label>
      <select
        id="status"
        {...register("status", { required: "Select a status" })}
      >
        <option value="">Select Status</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Postponed">Postponed</option>
        <option value="Postponed">Pending</option>
      </select>
      {errors.status && (
        <span className="form-group-error">{errors.status.message}</span>
      )}
    </div>
  );
}

export function BranchComponent({
  setSelectedBranches,
  clearErrors,
  selectedBranches,
  errors,
  register,
}) {
  return (
    <div className="form-section form-branch-section">
      <div className="form-row">
        <BranchGroup
          setSelectedBranches={setSelectedBranches}
          clearErrors={clearErrors}
          selectedBranches={selectedBranches}
        />
      </div>
      {errors.branches && (
        <span className="form-group-error">{errors.branches.message}</span>
      )}
      <div className="form-section">
        {selectedBranches.length > 0 && (
          <>
            <h5>Selected Branches and Amounts</h5>
            <div className="form-amt-grid-container">
              {selectedBranches.map((branch) => (
                <Branches
                  key={branch}
                  branch={branch}
                  register={register}
                  errors={errors}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
