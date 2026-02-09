import { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { apiClient } from '../../lib/api';
import { set } from 'react-hook-form';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
  sizes: string[];
  colors: string[];
  sku: string;
  isActive: boolean;
  isNew: boolean;
  isFeatured: boolean;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Partial<Product>) => Promise<void>;
  product?: Product | null;
  categories: Array<{ id: string; name: string }>;
}

export function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories,
}: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    images: [],
    sizes: [],
    colors: [],
    sku: '',
    isActive: true,
    isNew: false,
    isFeatured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sizesInput, setSizesInput] = useState('');
  const [colorsInput, setColorsInput] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: categories[0]?.id || '',
      images: [],
      sizes: [],
      colors: [],
      sku: '',
      isActive: true,
      isNew: false,
      isFeatured: false,
    });
    setSizesInput('');
    setColorsInput('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });
      setSizesInput(product.sizes.join(', '));
      setColorsInput(product.colors.join(', '));
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        categoryId: categories[0]?.id || '',
        images: [],
        sizes: [],
        colors: [],
        sku: '',
        isActive: true,
        isNew: false,
        isFeatured: false,
      });
    }
  }, [product, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sizes = sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const colors = colorsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const payload: Partial<Product> = {
      ...formData,
      sizes,
      colors,
      price: Number(formData.price ?? 0),
      stock: Number(formData.stock ?? 0),
    };
    setIsSubmitting(true);
    try {
      await onSubmit(payload);
      toast.success(
        product
          ? 'Producto actualizado correctamente'
          : 'Producto creado correctamente',
      );
      resetForm();
      onClose();
    } catch (error: any) {
      console.error('Error al guardar producto:', error);
      toast.error(error?.message || 'Error al guardar producto');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls = await apiClient.uploadImages(imageFiles);

      const normalizedUrls: string[] = uploadedUrls.map((item) =>
        typeof item === 'string' ? item : item.url,
      );

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images ?? []), ...normalizedUrls],
      }));

      toast.success(`${imageFiles.length} imagen(es) subida(s) correctamente`);
    } catch (error: any) {
      console.error('Error al subir imágenes:', error);
      toast.error(error?.message || 'Error al subir las imágenes');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls = await apiClient.uploadImages(imageFiles);

      const normalizedUrls: string[] = uploadedUrls.map((item) =>
        typeof item === 'string' ? item : item.url,
      );

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images ?? []), ...normalizedUrls],
      }));

      toast.success(`${imageFiles.length} imagen(es) subida(s) correctamente`);
    } catch (error: any) {
      console.error('Error al subir imágenes:', error);
      toast.error(error?.message || 'Error al subir las imágenes');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddImageUrl = () => {
    const url = prompt('Ingresa la URL de la imagen:');
    if (url) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), url],
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Información Básica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">Nombre del Producto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ej: Vestido Floral"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku" className="text-gray-700 dark:text-gray-200">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  placeholder="Ej: VES-001"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-200">Descripción</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descripción del producto..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId" className="text-gray-700 dark:text-gray-200">Categoría</Label>
              <select
                id="categoryId"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Precio e Inventario */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Precio e Inventario
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700 dark:text-gray-200">Precio ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: Number(e.target.value),
                    })
                  }
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-gray-700 dark:text-gray-200">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: parseInt(e.target.value),
                    })
                  }
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Imágenes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Imágenes</h3>

            {/* Drag and Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-all
                ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-gray-800'
                    : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }
                ${isUploading ? 'cursor-wait opacity-60' : 'cursor-pointer'}
              `}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-3 animate-spin" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Subiendo imágenes...
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Por favor espera</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold text-blue-600">
                      Click para seleccionar
                    </span>{' '}
                    o arrastra imágenes aquí
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploading}
              />
            </div>

            {/* Image Preview Grid */}
            {formData.images && formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add URL Button */}
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Agregar URL de imagen
            </button>
          </div>

          {/* Variantes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Variantes</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sizes" className="text-gray-700 dark:text-gray-200">Tallas (separadas por coma)</Label>
                <Input
                  id="sizes"
                  value={sizesInput}
                  onChange={(e) => {
                    setSizesInput(e.target.value);
                  }}
                  placeholder="XS, S, M, L, XL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="colors" className="text-gray-700 dark:text-gray-200">Colores (separados por coma)</Label>
                <Input
                  id="colors"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  placeholder="Rojo, Azul, Negro"
                />
              </div>
            </div>
          </div>

          {/* Opciones */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Opciones</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-200">Producto activo</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) =>
                    setFormData({ ...formData, isNew: e.target.checked })
                  }
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-200">Marcar como nuevo</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-200">
                  Producto destacado
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Guardando...'
                : product
                  ? 'Actualizar'
                  : 'Crear Producto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
