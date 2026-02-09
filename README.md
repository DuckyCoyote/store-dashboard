# Fashion Store Dashboard

Dashboard administrativo completo para gestionar una tienda online de ropa, con modo oscuro, responsive design y múltiples funcionalidades.

## 🌟 Características Principales

### ✨ Modo Oscuro
- Toggle entre modo claro y oscuro
- Preferencia guardada en localStorage
- Todos los componentes optimizados para ambos temas

### 📱 Diseño Responsive
- Menú hamburguesa en móvil con animación suave
- Adaptación completa a todos los tamaños de pantalla
- Grid responsivo en todas las secciones

### 🔍 Búsqueda Inteligente
- Sugerencias en tiempo real
- Búsquedas recientes
- Filtrado por pedidos, productos y clientes

### 🔔 Sistema de Notificaciones
- Notificaciones en tiempo real
- Categorización por tipo (pedidos, stock, clientes)
- Marcar todas como leídas
- Contador de notificaciones no leídas

### 👤 Menú de Usuario
- Perfil de usuario
- Acceso rápido a configuración
- Toggle de tema integrado
- Opción de cerrar sesión

## 📊 Secciones del Dashboard

### 1. Dashboard Principal
- 4 KPIs principales (Ingresos, Pedidos, Productos, Clientes)
- Gráfico de ventas mensuales con área
- Top 5 productos más vendidos
- Tabla de pedidos recientes

### 2. Pedidos
- Lista completa de pedidos con filtros
- Búsqueda por ID, cliente o email
- Filtro por estado (Entregado, Procesando, Pendiente, Cancelado)
- Vista de tarjetas en móvil y tabla en desktop
- Estadísticas de pedidos

### 3. Productos
- Vista de cuadrícula y lista
- Filtros por categoría
- Búsqueda por nombre o SKU
- Indicadores de stock (Activo, Stock Bajo, Sin Stock)
- Estadísticas de inventario

### 4. Clientes
- Tarjetas de clientes con información completa
- Filtros por tipo (VIP, Regular, Nuevos)
- Búsqueda por nombre, email o teléfono
- Métricas de clientes (Total gastado, pedidos, último pedido)
- Estadísticas por segmento

### 5. Análisis
- KPIs avanzados (Conversión, Valor Promedio, Retención)
- Gráfico de barras: Ventas, Gastos y Beneficios
- Gráfico circular: Distribución por categorías
- Top productos más rentables
- Análisis de segmentos de clientes

### 6. Configuración
- Información general de la tienda
- Configuración regional (Moneda, Idioma, Zona horaria)
- Gestión de notificaciones
- Seguridad (2FA, Backup automático)
- Métodos de pago

## 🎨 Tecnologías Utilizadas

- **React 18.3.1** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos con soporte dark mode
- **Recharts** - Gráficos y visualizaciones
- **Lucide React** - Iconos
- **Context API** - Gestión de estado del tema

## 🚀 Uso

### Toggle de Modo Oscuro
1. Haz clic en el avatar de usuario (esquina superior derecha)
2. Haz clic en "Modo Oscuro" / "Modo Claro" en el dropdown
3. El tema se guarda automáticamente en localStorage

### Búsqueda
1. Haz clic en la barra de búsqueda
2. Escribe para ver sugerencias en tiempo real
3. Las búsquedas recientes aparecen cuando el campo está vacío

### Notificaciones
1. Haz clic en el icono de campana
2. Ve todas las notificaciones sin leer (punto rojo)
3. Marca todas como leídas o elimina individualmente

### Menú Móvil
1. En dispositivos móviles, haz clic en el icono de hamburguesa
2. Selecciona una sección del menú
3. El menú se cierra automáticamente después de seleccionar

## 📱 Breakpoints Responsive

- **Mobile**: < 768px (Menu hamburguesa, vistas de tarjetas)
- **Tablet**: 768px - 1024px (Grid 2 columnas)
- **Desktop**: > 1024px (Sidebar fijo, tabla completa)

## 🎯 Características del Código

- **Componentes modulares** - Cada sección es un componente independiente
- **TypeScript** - Tipado completo para mejor mantenibilidad
- **Context API** - Gestión eficiente del tema
- **Hooks personalizados** - useTheme para acceso al tema
- **Responsive first** - Mobile-first approach
- **Accesibilidad** - ARIA labels y navegación por teclado

## 🔄 Estados y Filtros

Todas las secciones incluyen:
- Búsqueda en tiempo real
- Filtros múltiples
- Ordenamiento
- Vista de estados vacíos
- Carga optimizada

## 💡 Próximas Mejoras Sugeridas

- [ ] Agregar animaciones con Framer Motion
- [ ] Implementar paginación en tablas
- [ ] Modales para crear/editar elementos
- [ ] Exportación de datos a CSV/PDF
- [ ] Integración con backend real
- [ ] Sistema de roles y permisos
- [ ] Modo offline con cache
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
