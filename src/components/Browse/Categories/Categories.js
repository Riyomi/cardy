const Categories = ({
  categories,
  categoryFilter,
  setCategoryFilter,
  menuRef,
}) => {
  return (
    <div ref={menuRef} id="categories">
      <span id="categories-title">
        {categoryFilter ? categoryFilter : 'All Categories'}
      </span>
      <div
        onClick={() => setCategoryFilter('')}
        style={{ cursor: 'pointer' }}
        className={!categoryFilter ? 'active-category' : ''}
      >
        <span id="categories-menu-icon" className="material-icons-outlined">
          menu
        </span>
        <span>All Categories</span>
      </div>
      <ul>
        {categories &&
          categories.map((category) => (
            <li
              key={category.id}
              onClick={(e) => setCategoryFilter(e.target.innerText)}
              className={
                category.name === categoryFilter ? 'active-category' : ''
              }
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
