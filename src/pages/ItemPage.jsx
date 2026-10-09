import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import Preloader from '../components/Preloader';
import { fetchItemById } from '../api';

// стр одного товара
const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchItemById(id);
        if (!cancelled) setItem(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <><Banner /><Preloader /></>;
  if (error) return <><Banner /><p className="text-center text-danger">{error}</p></>;
  if (!item) return null;

  const availableSizes = item.sizes.filter((s) => s.available);
  const hasSizes = availableSizes.length > 0;
  const canAddToCart = hasSizes && selectedSize !== null;

  return (
    <>
      <Banner />
      <section className="catalog-item">
        <h2 className="text-center">{item.title}</h2>
        <div className="row">
          <div className="col-5">
            <img src={item.images[0]} className="img-fluid" alt={item.title} />
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr><td>Артикул</td><td>{item.sku}</td></tr>
                <tr><td>Производитель</td><td>{item.manufacturer}</td></tr>
                <tr><td>Цвет</td><td>{item.color}</td></tr>
                <tr><td>Материалы</td><td>{item.material}</td></tr>
                <tr><td>Сезон</td><td>{item.season}</td></tr>
                <tr><td>Повод</td><td>{item.reason}</td></tr>
              </tbody>
            </table>

            {hasSizes && (
              <div className="text-center">
                <p>
                  Размеры в наличии:{' '}
                  {availableSizes.map((s) => (
                    <span
                      key={s.size}
                      className={`catalog-item-size ${selectedSize === s.size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(s.size)}
                    >
                      {s.size}
                    </span>
                  ))}
                </p>
                <p>
                  Количество:{' '}
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCount(count - 1 < 1 ? 1 : count - 1)}
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">{count}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCount(count + 1 > 10 ? 10 : count + 1)}
                    >
                      +
                    </button>
                  </span>
                </p>
              </div>
            )}

            {hasSizes && (
              <button
                className="btn btn-danger btn-block btn-lg"
                disabled={!canAddToCart}
                onClick={() => navigate('/cart.html')}
              >
                В корзину
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemPage;