function Selector({
  style = {},
  options,
  callback,
  curValue,
  label,
  disabled = false,
}) {
  return (
    <div style={style} className="selector">
      <select value={curValue} onChange={callback} disabled={disabled}>
        {label && <option value="">{label}</option>}
        {options?.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
