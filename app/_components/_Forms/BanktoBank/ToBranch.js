export function ToBranch({ register, errors }) {
  const { branchNames } = useSelector((state) => state.general);
  return (
    <div className="form-group">
      <label htmlFor="branchselector" className="form-group-formlabel">
        Branch
      </label>
      <select
        id="branch"
        {...register("toBranch", { required: "GST Percent is required" })}
      >
        <option value="">Select a branch</option>
        {branchNames?.map((branch, i) => (
          <option key={i} value={branch}>
            {branch}
          </option>
        ))}
      </select>
      {errors.toBranch && (
        <span className="form-group-error">{errors.branch.message}</span>
      )}
    </div>
  );
}
