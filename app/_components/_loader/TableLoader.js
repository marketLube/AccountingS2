"use client";

import PageLoader from "../layouts/PageLoader";

function TableLoader({ error = "", style, className }) {
  if (error)
    return (
      <div className={`table-loader ${className}`} style={style}>
        <div className="error-message">{error}</div>
      </div>
    );
  return (
    <div className={`table-loader ${className}`} style={style}>
      {/* <div className="spinner"></div> */}
      <PageLoader />
    </div>
  );
}

export default TableLoader;
