import { useState, useRef, useEffect } from 'react';
import { Search, TrendingUp } from 'lucide-react';

const searchSuggestions = [
  { type: 'order', label: 'Pedido #ORD-1234', subtitle: 'María González' },
  { type: 'product', label: 'Vestido Floral', subtitle: '€89.99 - En stock' },
  { type: 'customer', label: 'Carlos Ruiz', subtitle: 'carlos.r@email.com' },
  { type: 'product', label: 'Camisa Lino Blanca', subtitle: '€45.99 - En stock' },
  { type: 'customer', label: 'Ana Martínez', subtitle: 'ana.m@email.com' },
  { type: 'order', label: 'Pedido #ORD-1235', subtitle: 'Carlos Ruiz' },
];

const recentSearches = [
  'Vestido Floral',
  'Pedido #ORD-1234',
  'María González',
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = query
    ? searchSuggestions.filter(
        s => s.label.toLowerCase().includes(query.toLowerCase()) ||
             s.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-48 lg:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      
      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 
                        dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {query === '' ? (
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                Búsquedas Recientes
              </p>
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 
                           rounded-lg transition-colors text-left"
                >
                  <TrendingUp className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          ) : filteredSuggestions.length > 0 ? (
            <div className="p-2">
              {filteredSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-start gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 
                           rounded-lg transition-colors text-left"
                  onClick={() => {
                    setQuery(suggestion.label);
                    setIsOpen(false);
                  }}
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    suggestion.type === 'order' ? 'bg-blue-500' :
                    suggestion.type === 'product' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{suggestion.label}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{suggestion.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">No se encontraron resultados</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
