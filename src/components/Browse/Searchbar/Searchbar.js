const Searchbar = ({ setSearchFilter }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="start browsing..."
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      <span className="material-icons-outlined">search</span>
    </div>
  );
};

export default Searchbar;
