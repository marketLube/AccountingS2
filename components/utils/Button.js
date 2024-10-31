"use client";
function Button({ children, type = "primary", onClick = () => {} }, style) {
  if (type === "thertiary")
    return (
      <button className="btn thertiary" onClick={onClick} style={style}>
        {children}
      </button>
    );
  if (type === "secondary")
    return (
      <button className="btn secondary" onClick={onClick} style={style}>
        {children}
      </button>
    );
  return (
    <button className="btn primary" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default Button;
