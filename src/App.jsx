import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <Router>
    <Header />
    <main className="container">
      <div className="row">
        <div className="col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog.html" element={<CatalogPage />} />
            <Route path="/catalog/:id.html" element={<ItemPage />} />
            <Route path="/cart.html" element={<CartPage />} />
            <Route path="/about.html" element={<AboutPage />} />
            <Route path="/contacts.html" element={<ContactsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </main>
    <Footer />
  </Router>
);

export default App;