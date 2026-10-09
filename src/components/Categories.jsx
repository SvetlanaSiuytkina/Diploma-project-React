// список категорий для каталога
const Categories = ({ categories, activeId, onSelect }) => (
  <ul className="catalog-categories nav justify-content-center">
    <li className="nav-item">
      <a
        className={`nav-link ${activeId === 0 ? 'active' : ''}`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelect(0);
        }}
      >
        Все
      </a>
    </li>
    {categories.map((cat) => (
      <li className="nav-item" key={cat.id}>
        <a
          className={`nav-link ${activeId === cat.id ? 'active' : ''}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelect(cat.id);
          }}
        >
          {cat.title}
        </a>
      </li>
    ))}
  </ul>
);

export default Categories;