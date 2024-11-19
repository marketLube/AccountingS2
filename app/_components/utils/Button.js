"use client";

function Button({
  children,
  type = "primary",
  onClick = () => {},
  style,
  disabled = false,
}) {
  if (type === "filter") {
    return (
      <button
        className="filterbtn"
        onClick={onClick}
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (type === "submit")
    return (
      <button
        type="submit"
        className="btn submit-btn"
        onClick={onClick}
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    );
  if (type === "clear")
    return (
      <button
        className="btn clear-btn"
        onClick={onClick}
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    );

  if (type === "thertiary")
    return (
      <button
        className="btn thertiary"
        onClick={onClick}
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    );
  if (type === "secondary")
    return (
      <button
        className="btn secondary"
        onClick={onClick}
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    );
  return (
    <button
      className="btn primary"
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
