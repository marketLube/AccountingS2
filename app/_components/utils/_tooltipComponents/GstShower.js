"use client";

function GstShower({ data, amount }) {
  if (!data || !amount) return null;

  console.log(amount, "amt");
  const validAmount = parseFloat(amount) || 0;
  const gstPercent = parseFloat(data.gstPercent) || 0;

  let gstAmount = 0;

  if (data?.gstType === "incl") {
    console.log(amount, "amt");
    console.log(gstPercent, "percent");
    gstAmount = (validAmount * gstPercent) / (100 + gstPercent);
  } else if (data?.gstType === "excl") {
    gstAmount = (validAmount * gstPercent) / 100;
  } else {
    gstAmount = 0;
  }

  return (
    <div>
      <span className="small-text table-small-text">
        {data.gstType === "incl"
          ? "Incl"
          : data.gstType === "excl"
          ? "Excl"
          : "No-Gst"}{" "}
        {gstPercent}%
      </span>
      <span className="small-text table-small-text">
        {gstAmount.toFixed(2)}
      </span>
    </div>
  );
}

export default GstShower;
