import { useEffect, useState } from 'react';
import CatalogItem from './CatalogItem';
import Preloader from './Preloader';
import { fetchTopSales } from '../api';

const TopSales = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTopSales();
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, []);

  if (!loading && !error && items.length === 0) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>

      {loading && <Preloader />}

      {error && (
        <p className="text-center text-danger">
          Не удалось загрузить хиты продаж: {error}
        </p>
      )}

      {items.length > 0 && (
        <div className="row">
          {items.map((item) => (
            <CatalogItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopSales;