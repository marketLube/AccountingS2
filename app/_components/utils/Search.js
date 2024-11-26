function Search({ query = "", handleQuery = () => {} }) {
  return (
    <input
      className="search"
      placeholder="Search"
      value={query}
      onChange={handleQuery}
    />
  );
}

export default Search;
