"use client";
function GstShower({ data, amount }) {
  if (!data || !amount) return null;

  const validAmount = parseFloat(amount) || 0;
  const gstPercent = parseFloat(data.gstPercent) || 0;

  let gstAmount = 0;

  if (data?.gstType === "incl") {
    gstAmount = (validAmount * gstPercent) / (100 + gstPercent);
  } else if (data?.gstType === "excl") {
    gstAmount = (validAmount * gstPercent) / 100;
  }
  return (
    <div>
      <span>{data.gstType === "incl" ? "Incl" : "Excl"}</span>
      <span className="small-text table-small-text">{gstPercent}%</span>
      <span className="small-text table-small-text">
        {gstAmount.toFixed(2)}
      </span>
    </div>
  );
}

export default GstShower;
