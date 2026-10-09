import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Catalog from '../components/Catalog';

// страница каталога с поиском
const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  //если URL изменился обнов поле
  useEffect(() => {
    setSearchInput(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <form className="catalog-search-form form-inline" onSubmit={handleSearchSubmit}>
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </section>

      <Catalog searchQuery={searchParams.get('q') || ''} />
    </>
  );
};

export default CatalogPage;