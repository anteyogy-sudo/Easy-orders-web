import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-red-900 text-white">
      <div className="relative max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold">Мой магазин</span>

        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav
          className={`
            ${isOpen ? 'block' : 'hidden'} 
            md:flex md:items-center md:gap-6
            absolute md:static left-0 right-0 top-full bg-red-900 md:bg-transparent p-4 md:p-0
            z-10
          `}
        >
          <Link to="/" className="block md:inline py-2 md:py-0 hover:underline" onClick={() => setIsOpen(false)}>Главная</Link>
          <Link to="/catalog" className="block md:inline py-2 md:py-0 hover:underline" onClick={() => setIsOpen(false)}>Каталог</Link>
          <Link to="/cart" className="block md:inline py-2 md:py-0 hover:underline" onClick={() => setIsOpen(false)}>Корзина</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="block md:inline py-2 md:py-0 hover:underline" onClick={() => setIsOpen(false)}>Заказы</Link>
              <Link to="/profile" className="block md:inline py-2 md:py-0 hover:underline" onClick={() => setIsOpen(false)}>Профиль</Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block md:inline py-2 md:py-0 hover:underline"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link to="/auth" className="block md:inline py-2 md:py-0 hover:underline" onClick={() => setIsOpen(false)}>Вход</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;