import { Link } from 'react-router-dom';
//карточка товара исп в хитах и каталоге
const CatalogItem = ({ item }) => (
  <div className="col-4">
    <div className="card catalog-item-card">
      <img
        src={item.images[0]}
        className="card-img-top img-fluid"
        alt={item.title}
      />
      <div className="card-body">
        <p className="card-text">{item.title}</p>
        <p className="card-text">{item.price.toLocaleString('ru-RU')} руб.</p>
        <Link to={`/catalog/${item.id}.html`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  </div>
);

export default CatalogItem;