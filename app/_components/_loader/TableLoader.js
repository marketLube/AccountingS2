"use client";

function TableLoader({ error = "", style, className }) {
  if (error)
    return (
      <div className={`table-loader ${className}`} style={style}>
        <div className="error-message">{error}</div>
      </div>
    );
  return (
    <div className={`table-loader ${className}`} style={style}>
      <div className="spinner"></div>
    </div>
  );
}

export default TableLoader;
