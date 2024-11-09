function Selector({ style = {}, options, callback, curValue }) {
  return (
    <div style={style} className="selector">
      <select value={curValue} onChange={callback}>
        {options?.map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
