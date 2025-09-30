# BIMCORD Public Price List Widget

Widget independiente para mostrar listas de precios públicas de BIMCORD en cualquier sitio web.

## 🚀 Uso Rápido

### Opción 1: Archivos locales
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="public-price-list.css">
</head>
<body>
    <div id="price-list" data-project-id="TU_PROJECT_ID"></div>
    <script src="public-price-list.js"></script>
    <script>
        PublicPriceList.init('price-list', {
            projectId: 'TU_PROJECT_ID'
        });
    </script>
</body>
</html>
```

### Opción 2: CDN jsDelivr (cuando subas a GitHub)
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/TU_USUARIO/TU_REPO@main/cdn-public-price-list/public-price-list.css">
</head>
<body>
    <div id="price-list"></div>
    <script src="https://cdn.jsdelivr.net/gh/TU_USUARIO/TU_REPO@main/cdn-public-price-list/public-price-list.js"></script>
    <script>
        PublicPriceList.init('price-list', {
            projectId: 'TU_PROJECT_ID'
        });
    </script>
</body>
</html>
```

## 📋 Configuración

### Parámetros de inicialización

```javascript
PublicPriceList.init('container-id', {
    projectId: 'ID_DEL_PROYECTO',           // Requerido
    apiBaseUrl: 'URL_DE_TU_API',            // Opcional, por defecto usa tu API
    embedded: true                          // Opcional, para modo embebido
});
```

### Opciones de configuración

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `projectId` | string | ✅ | ID del proyecto a mostrar |
| `apiBaseUrl` | string | ❌ | URL base de la API (por defecto: tu API de producción) |
| `embedded` | boolean | ❌ | Modo embebido (sin min-height) |

## 🎨 Personalización

### CSS Custom Properties
Puedes personalizar los colores modificando las variables CSS:

```css
:root {
  --primary-500: #tu-color-primario;
  --primary-600: #tu-color-primario-oscuro;
  --primary-700: #tu-color-primario-mas-oscuro;
}
```

### Clases CSS disponibles
- `.public-price-list` - Contenedor principal
- `.embedded` - Modo embebido
- Todas las clases de utilidad tipo Tailwind

## 🌐 Integración en diferentes plataformas

### WordPress
```html
<!-- En un post o página -->
<div id="bimcord-price-list"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/TU_REPO/public-price-list.css">
<script src="https://cdn.jsdelivr.net/gh/TU_REPO/public-price-list.js"></script>
<script>
    PublicPriceList.init('bimcord-price-list', {
        projectId: '123',
        embedded: true
    });
</script>
```

### React/Vue/Angular
```javascript
// En componentDidMount, mounted, ngOnInit, etc.
PublicPriceList.init('price-list-container', {
    projectId: this.projectId
});
```

### Como iframe
```html
<iframe src="public-price-list.html?projectId=123" 
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>
```

## 📱 Responsive

El widget es completamente responsive y se adapta a:
- ✅ Desktop
- ✅ Tablet  
- ✅ Mobile
- ✅ Iframe embebido

## 🔧 API

### Endpoint utilizado