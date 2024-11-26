import { useSelector } from "react-redux";
import Branches from "./Branches";
import BranchGroup from "./BranchGroup";

export function Purpose({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="purpose" className="form-group-formlabel">
        Purpose
      </label>
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
export function Student({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="student" className="form-group-formlabel">
        Student
      </label>
      <input
        type="text"
        id="student"
        {...register("student", {
          required: "Stuent is required",
        })}
      />
      {errors.student && (
        <span className="form-group-error">{errors.student.message}</span>
      )}
    </div>
  );
}
export function Country({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="Country" className="form-group-formlabel">
        Country
      </label>
      <input
        type="text"
        id="Country"
        {...register("Country", {
          required: "Country is required",
        })}
      />
      {errors.country && (
        <span className="form-group-error">{errors.country.message}</span>
      )}
    </div>
  );
}

export function University({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="University" className="form-group-formlabel">
        University
      </label>
      <input
        type="text"
        id="University"
        {...register("University", {
          required: "University is required",
        })}
      />
      {errors.university && (
        <span className="form-group-error">{errors.university.message}</span>
      )}
    </div>
  );
}
export function Commission({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="Commission" className="form-group-formlabel">
        Commission
      </label>
      <input
        type="text"
        id="Commission"
        {...register("Commission", {
          required: "Commission is required",
        })}
      />
      {errors.commission && (
        <span className="form-group-error">{errors.commission.message}</span>
      )}
    </div>
  );
}

export function INR({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="INR" className="form-group-formlabel">
        INR
      </label>
      <input
        type="number"
        id="INR"
        {...register("INR", {
          required: "INR is required",
        })}
      />
      {errors.inr && (
        <span className="form-group-error">{errors.inr.message}</span>
      )}
    </div>
  );
}

export function Agent({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="Agent" className="form-group-formlabel">
        Agent
      </label>
      <input
        type="text"
        id="Agent"
        {...register("Agent", {
          required: "Agent is required",
        })}
      />
      {errors.agent && (
        <span className="form-group-error">{errors.agent.message}</span>
      )}
    </div>
  );
}

export function Counsillor({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="counsillor" className="form-group-formlabel">
        Counsillor
      </label>
      <input
        type="text"
        id="counsillor"
        {...register("counsillor", {
          required: "counsillor is required",
        })}
      />
      {errors.counsillor && (
        <span className="form-group-error">{errors.counsillor.message}</span>
      )}
    </div>
  );
}

export function Property({ register, errors, isDisabled }) {
  return (
    <div className="form-group">
      <label htmlFor="property" className="form-group-formlabel">
        Create Property
      </label>
      <input
        type="text"
        id="property"
        disabled={isDisabled}
        {...register("property", {
          onChange: (e) => {
            // Clear existingProperty when property is being typed
            if (e.target.value) {
              const existingPropertyField =
                document.getElementById("existingProperty");
              if (existingPropertyField) {
                existingPropertyField.value = "";
              }
            }
          },
        })}
      />
      {errors.property && (
        <span className="form-group-error">{errors.property.message}</span>
      )}
    </div>
  );
}

// ExistingProperty Component
export function ExistingProperty({ register, errors, isDisabled }) {
  const { propertyNames } = useSelector((state) => state.budgetplanner);

  return (
    <div className="form-group">
      <label htmlFor="existingProperty" className="form-group-formlabel">
        Select Property
      </label>
      <select
        id="existingProperty"
        disabled={isDisabled}
        {...register("existingProperty", {
          onChange: (e) => {
            // Clear property input when existingProperty is selected
            if (e.target.value) {
              const propertyField = document.getElementById("property");
              if (propertyField) {
                propertyField.value = "";
              }
            }
          },
        })}
      >
        <option value="">Select a Property</option>
        {propertyNames?.map((property, i) => (
          <option key={i} value={property}>
            {property}
          </option>
        ))}
      </select>
      {errors.existingProperty && (
        <span className="form-group-error">
          {errors.existingProperty.message}
        </span>
      )}
    </div>
  );
}

export function Invested({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="invested" className="form-group-formlabel">
        Invested
      </label>
      <input
        type="text"
        id="invested"
        {...register("invested", {
          required: "invested is required",
        })}
      />
      {errors.invested && (
        <span className="form-group-error">{errors.invested.message}</span>
      )}
    </div>
  );
}
export function Item({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="item" className="form-group-formlabel">
        Item
      </label>
      <input
        type="text"
        id="item"
        {...register("item", {
          required: "Item is required",
        })}
      />
      {errors.item && (
        <span className="form-group-error">{errors.item.message}</span>
      )}
    </div>
  );
}
export function Amount({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="item" className="form-group-formlabel">
        Amount
      </label>
      <input
        type="number"
        id="amouont"
        {...register("amount", {
          required: "Amount is required",
        })}
      />
      {errors.item && (
        <span className="form-group-error">{errors.amount.message}</span>
      )}
    </div>
  );
}
export function PurchasedBy({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="item" className="form-group-formlabel">
        Purchased By
      </label>
      <input
        type="text"
        id="purchasedBy"
        {...register("purchasedBy", {
          required: "Purchased by is required",
        })}
      />
      {errors.item && (
        <span className="form-group-error">{errors.purchasedBy.message}</span>
      )}
    </div>
  );
}

export function Remark({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="remark" className="form-group-formlabel">
        Remark
      </label>
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

export function Bank({ register, errors, val = "bank" }) {
  const { banks } = useSelector((state) => state.general);
  return (
    <div className="form-group">
      <label htmlFor={val} className="form-group-formlabel">
        Bank
      </label>
      <select id={val} {...register(val, { required: "Bank is required" })}>
        <option value="">Select Bank</option>
        {banks?.map((bank) => (
          <option value={bank.name} key={bank._id}>
            {bank.name}
          </option>
        ))}
      </select>
      {errors[val] && (
        <span className="form-group-error">{errors[val].message}</span>
      )}
    </div>
  );
}

export function Tds({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="tds" className="form-group-formlabel">
        TDS
      </label>
      <select id="tds" {...register("tds", { required: "TDS is required" })}>
        <option value="">Select TDS Percent %</option>
        <option value="0%">0%</option>
        <option value="2%">2%</option>
        <option value="5%">5%</option>
        <option value="10%">10%</option>
        <option value="15%">15%</option>
      </select>
      {errors.tds && (
        <span className="form-group-error">{errors.tds.message}</span>
      )}
    </div>
  );
}

export function BranchSelector({ register, errors, val = "branch" }) {
  const { branchNames } = useSelector((state) => state.general);
  return (
    <div className="form-group">
      <label htmlFor="branchselector" className="form-group-formlabel">
        Branch
      </label>
      <select
        id={val}
        {...register(val, { required: "GST Percent is required" })}
      >
        <option value="">Select a branch</option>
        {branchNames?.map((branch, i) => (
          <option key={i} value={branch}>
            {branch}
          </option>
        ))}
      </select>
      {errors[val] && (
        <span className="form-group-error">{errors[val].message}</span>
      )}
    </div>
  );
}

export function IntakeSelector({ register, errors }) {
  const { intake } = useSelector((state) => state.general);
  return (
    <div className="form-group">
      <label htmlFor="intakeselector" className="form-group-formlabel">
        Intake
      </label>
      <select id="intake" {...register("intake", { required: " required" })}>
        <option value="">Select intake</option>
        {intake?.map((intake, i) => (
          <option key={i} value={intake}>
            {intake}
          </option>
        ))}
      </select>
      {errors.intake && (
        <span className="form-group-error">{errors.intake.message}</span>
      )}
    </div>
  );
}

export function MonthSelector({ register, errors }) {
  const { month } = useSelector((state) => state.general);
  return (
    <div className="form-group">
      <label htmlFor="monthselector" className="form-group-formlabel">
        Intake Month
      </label>
      <select id="month" {...register("month", { required: " required" })}>
        <option value="">Select Intake Month</option>
        {month?.map((month, i) => (
          <option key={i} value={month}>
            {month}
          </option>
        ))}
      </select>
      {errors.month && (
        <span className="form-group-error">{errors.month.message}</span>
      )}
    </div>
  );
}
// GstPercent Component for GST Percent Selection
export function GstPercent({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="gstPercent" className="form-group-formlabel">
        GST Percent
      </label>
      <select
        id="gstPercent"
        {...register("gstPercent", { required: "GST Percent is required" })}
      >
        <option value="">Select GST Percent %</option>
        <option value="0%">0%</option>
        <option value="2%">5%</option>
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
export function Radio({ register, errors, label = "Type" }) {
  return (
    <div className="form-group">
      <label
        htmlFor="Type"
        className="type-option-label"
        style={{
          textWrap: "nowrap",
          width: "100%",
          textAlign: "center",
        }}
      >
        {label}
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
// Radio Component for "Type" Selection
export function AssetsType({ register, errors }) {
  return (
    <div className="form-group">
      <label
        htmlFor="Type"
        className="type-option-label"
        style={{
          textWrap: "nowrap",
          width: "100%",
          textAlign: "center",
        }}
      >
        Type
      </label>
      <div className="type-options">
        <label className="type-option">
          <input
            type="radio"
            value="Fixed"
            {...register("type", {
              required: "Select a type",
            })}
          />
          Fixed
        </label>
        <label className="type-option">
          <input
            type="radio"
            value="Temp"
            {...register("type", {
              required: "Select a type",
            })}
          />
          Temp
        </label>
      </div>
      {errors.type && (
        <span className="form-group-error">{errors.type.message}</span>
      )}
    </div>
  );
}

// Gst Component for "GST Type" Selection
export function Gst({ register, errors, disabled = false }) {
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
            {...register("gstType")}
            disabled={disabled}
          />
          Inclusive
        </label>
        <label className="type-option">
          <input
            type="radio"
            value="excl"
            {...register("gstType")}
            disabled={disabled}
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

export function TdsPercent({ register, errors, disabled = false }) {
  return (
    <div className="form-group">
      <label htmlFor="TdsPercentType" className="type-option-label">
        TDS
      </label>
      <div className="type-options">
        <label className="type-option">
          <input
            type="radio"
            value="Payable"
            {...register("tdsType")}
            disabled={disabled}
          />
          Payable
        </label>
        <label className="type-option">
          <input
            type="radio"
            value="Receivable"
            {...register("tdsType")}
            disabled={disabled}
          />
          Receivable
        </label>
      </div>
      {errors.tdsType && (
        <span className="form-group-error">{errors.tdsType.message}</span>
      )}
    </div>
  );
}

export function DateSel({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="date" className="form-group-formlabel">
        Date
      </label>
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
      <label htmlFor="status" className="form-group-formlabel">
        Status
      </label>
      <select
        id="status"
        {...register("status", { required: "Select a status" })}
      >
        <option value="">Select Status</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Postponed">Postponed</option>
        <option value="Pending">Pending</option>
      </select>
      {errors.status && (
        <span className="form-group-error">{errors.status.message}</span>
      )}
    </div>
  );
}

export function AdminStatusSel({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="adminstatus" className="form-group-formlabel">
        Admin Status
      </label>
      <select
        id="adminstatus"
        {...register("adminstatus", { required: "Select a status" })}
      >
        <option value="">Select Status</option>

        <option value="Approved">Approved</option>
        <option value="Postponed">Postponed</option>
      </select>
      {errors.adminstatus && (
        <span className="form-group-error">{errors.adminstatus.message}</span>
      )}
    </div>
  );
}

export function AccountStatusSel({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="accountstatus" className="form-group-formlabel">
        Account Status
      </label>
      <select
        id="accountstatus"
        {...register("accountstatus", { required: "Select a status" })}
      >
        <option value="">Select Status</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>
      {errors.accountstatus && (
        <span className="form-group-error">{errors.accountstatus.message}</span>
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
  defaultAmounts = [],
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
        {selectedBranches?.length > 0 && (
          <>
            <h5>Selected Branches and Amounts</h5>
            <div
              className="form-amt-grid-container"
              style={{
                width: selectedBranches.length > 3 ? "100%" : "70%",
              }}
            >
              {selectedBranches?.map((branch, i) => (
                <Branches
                  defaultAmount={defaultAmounts && defaultAmounts[i]}
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
