"use client";

function ParticularSelector({ particular, setParticular, particulars }) {
  return (
    <div className="catagory-selector">
      <div className="cat-div">
        <select
          className="catagory-selector-select"
          value={particular}
          onChange={(e) => setParticular(e.target.value)}
        >
          <option value="">Select Particular</option>
          {particulars?.map((cat) => (
            <option value={cat.name} key={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ParticularSelector;
