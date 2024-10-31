function Button({ children, type = "primary", onClick = () => {} }) {
  return (
    <button className="btn primary" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
