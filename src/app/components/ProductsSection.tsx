import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Grid3x3, List, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductModal } from './ProductModal';
import { apiClient } from '../../lib/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  category?: { id: string; name: string };
  images: string[];
  sizes: string[];
  colors: string[];
  sku: string;
  isActive: boolean;
  isNew: boolean;
  isFeatured: boolean;
}

interface Category {
  id: string;
  name: string;
}

export function ProductsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [productsData, categoriesData] = await Promise.all([
        apiClient.getProducts(),
        apiClient.getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: any) {
      const errorMsg = err.message || 'Error al cargar productos';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (productData: Partial<Product>) => {
    try {
      await apiClient.createProduct(productData);
      await loadData();
      setIsModalOpen(false);
      toast.success('Producto creado correctamente');
    } catch (err: any) {
      toast.error(err.message || 'Error al crear producto');
      throw err; // Re-lanzar para que ProductModal maneje el estado
    }
  };

  const handleUpdateProduct = async (productData: Partial<Product>) => {
    if (!selectedProduct) return;
    try {
      await apiClient.updateProduct(selectedProduct.id, productData);
      await loadData();
      setIsModalOpen(false);
      setSelectedProduct(null);
      toast.success('Producto actualizado correctamente');
    } catch (err: any) {
      toast.error(err.message || 'Error al actualizar producto');
      throw err; // Re-lanzar para que ProductModal maneje el estado
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await apiClient.deleteProduct(id);
      await loadData();
      toast.success('Producto eliminado correctamente');
    } catch (err: any) {
      toast.error(err.message || 'Error al eliminar producto');
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category?.name === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (stock: number) => {
    if (stock === 0) {
      return <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded">Sin Stock</span>;
    }
    if (stock < 10) {
      return <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded">Stock Bajo</span>;
    }
    return <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded">Activo</span>;
  };

  const categoriesForFilter = ['all', ...Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)))];
  
  const stats = {
    total: products.length,
    active: products.filter(p => p.stock > 10).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
        <button
          onClick={loadData}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Productos</h2>
          <p className="text-xs lg:text-sm text-gray-600 mt-1">Gestiona el inventario de tu tienda</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm lg:text-base"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">Total Productos</p>
          <p className="text-xl lg:text-2xl font-semibold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">Activos</p>
          <p className="text-xl lg:text-2xl font-semibold text-green-600 mt-1">
            {stats.active}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">Stock Bajo</p>
          <p className="text-xl lg:text-2xl font-semibold text-orange-600 mt-1">
            {stats.lowStock}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">Sin Stock</p>
          <p className="text-xl lg:text-2xl font-semibold text-red-600 mt-1">
            {stats.outOfStock}
          </p>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200">
        <div className="flex flex-col gap-3 lg:gap-4 mb-4 lg:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
            >
              {categoriesForFilter.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todas las categorías' : cat}
                </option>
              ))}
            </select>

            <div className="hidden sm:flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <ImageWithFallback
                    src={product.images[0] || `https://source.unsplash.com/400x400/?fashion,${product.category?.name?.toLowerCase()}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category?.name}</p>
                    </div>
                    {getStatusBadge(product.stock)}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-gray-900">€{product.price}</span>
                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      <Edit className="w-4 h-4 inline mr-1" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors text-gray-700 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Producto</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Precio</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Stock</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Estado</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <ImageWithFallback
                            src={product.images[0] || `https://source.unsplash.com/100x100/?fashion,${product.category?.name?.toLowerCase()}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{product.category?.name}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">€{product.price}</td>
                    <td className="py-4 px-4 text-gray-700">{product.stock}</td>
                    <td className="py-4 px-4">{getStatusBadge(product.stock)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
          setSelectedProduct(null); // Asegurar que se limpie el producto seleccionado al cerrar el modal
        }}
        onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
        product={selectedProduct}
        categories={categories}
      />
    </div>
  );
}