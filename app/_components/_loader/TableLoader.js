"use client";

function TableLoader({ error = "" }) {
  if (error)
    return (
      <div className="table-loader">
        <div className="error-message">{error}</div>
      </div>
    );
  return (
    <div className="table-loader">
      <div className="spinner"></div>
    </div>
  );
}

export default TableLoader;
