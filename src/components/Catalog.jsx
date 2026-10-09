import { useEffect, useState } from 'react';
import Categories from './Categories';
import CatalogItem from './CatalogItem';
import Preloader from './Preloader';
import { fetchCategories, fetchItems } from '../api';

const Catalog = ({ searchQuery = '' }) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  //категории грузим 1р
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => {
      });
  }, []);

  // товары- при смене категории/поиска
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      setItems([]);
      setOffset(0);
      setHasMore(true);

      try {
        const data = await fetchItems({
          categoryId: categoryId || undefined,
          offset: 0,
          q: searchQuery || undefined,
        });
        if (cancelled) return;
        setItems(data);
        setOffset(data.length);
        setHasMore(data.length === 6);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, [categoryId, searchQuery]);

  // кнопка загрузить ещё
  const handleLoadMore = async () => {
    setLoadingMore(true);
    setError(null);
    try {
      const data = await fetchItems({
        categoryId: categoryId || undefined,
        offset,
        q: searchQuery || undefined,
      });
      setItems([...items, ...data]);
      setOffset(offset + data.length);
      setHasMore(data.length === 6);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      <Categories
        categories={categories}
        activeId={categoryId}
        onSelect={setCategoryId}
      />

      {loading && <Preloader />}

      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && items.length === 0 && !error && (
        <p className="text-center">Ничего не найдено</p>
      )}

      <div className="row">
        {items.map((item) => (
          <CatalogItem key={item.id} item={item} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          {loadingMore && <Preloader />}
          <button
            className="btn btn-outline-primary"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;