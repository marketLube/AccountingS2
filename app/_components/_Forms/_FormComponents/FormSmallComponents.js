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
export function Property({ register, errors, isDisabled }) {
  return (
    <div className="form-group">
      <label htmlFor="property">Create Property</label>
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
      <label htmlFor="existingProperty">Select Property</label>
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
      <label htmlFor="invested">Invested</label>
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
      <label htmlFor="item">Item</label>
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
      <label htmlFor="item">Amount</label>
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
      <label htmlFor="item">Purchased By</label>
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
          <option value={bank.name} key={bank._id}>
            {bank.name}
          </option>
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

export function BranchSelector({ register, errors }) {
  const { branchNames } = useSelector((state) => state.general);
  return (
    <div className="form-group">
      <label htmlFor="branchselector">Branch</label>
      <select
        id="branch"
        {...register("branch", { required: "GST Percent is required" })}
      >
        <option value="">Select a branch</option>
        {branchNames?.map((branch, i) => (
          <option key={i} value={branch}>
            {branch}
          </option>
        ))}
      </select>
      {errors.branch && (
        <span className="form-group-error">{errors.branch.message}</span>
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
            <div className="form-amt-grid-container">
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
