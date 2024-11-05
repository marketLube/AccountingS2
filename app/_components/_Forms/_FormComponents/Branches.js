function Branches({ branch, register, errors, defaultValue = "" }) {
  return (
    <div key={branch} className="form-amount-container">
      <label htmlFor={`amount_${branch}`}>{branch}</label>
      <div className="amount-field ">
        <input
          type="number"
          id={`${branch}`}
          step="any"
          defaultValue={defaultValue}
          {...register(`${branch}`, {
            required: "Amount is required",
            min: {
              value: 0,
              message: "Amount must be positive",
            },
          })}
        />
      </div>
      {errors[`${branch}`] && (
        <span className="form-group-error">{errors[`${branch}`].message}</span>
      )}
    </div>
  );
}

export default Branches;
