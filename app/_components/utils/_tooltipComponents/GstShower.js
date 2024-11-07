function GstShower({ data }) {
  if (!data) return;

  let type = "No Gst";
  if (data?.gstType === "incl") {
    type = "Incl" + ". " + data?.gstPercent;
  } else if (type === "excl") {
    type = "Exc" + ". " + data?.gstPercent;
  }
  return (
    <div>
      <span>{type}</span>
      <span className="small-text table-small-text">{data?.gstPercent}</span>
    </div>
  );
}

export default GstShower;
