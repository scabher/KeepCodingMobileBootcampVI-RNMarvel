# KeepCodingMobileBootcampVI-RNMarvel

Práctica correspondiente al módulo de React Native de KeepCoding

La temática de la App es la de comics y personajes aportados por la API de **Marvel** (https://developer.marvel.com). Consta de las cinco pantallas:

1. _Lista de comics_: Lista con dos columnas con las imágenes de portada del comic. Mostrará cuadros de texto para el título y la descripción así como la imagen de portada del comic. Al pulsar sobre la imágen se abrirá el seleccionador de imágenes típico del Sistema Operativo.
2. _Nuevo comic_: Pantalla para introducir un nuevo comic en la lista de imágenes.
3. _Detalle del comic_: Al pulsar en un comic, se mostrarán los detalles del comic, estos son:
   - Imagen: Portada del comic
   - Título: Título completo
   - Descripción: Breve descripción del comic.
   - Personajes: Lista a dos columnas con las imágenes de los personajes que aparecen en el comic. A estas imágenes se le aplica una animación de rotación al cargarlas.
4. _Edición del comic_: Se accederá mediante un botón ubicado en el detalle del comic y mostrará cuadros de texto para el título y la descripción así como la imagen de portada del comic. Al pulsar sobre la imágen se abrirá el seleccionador de imágenes típico del Sistema Operativo.
5. _Detalle del personaje_: Se accederá desde el detalle del un comic y mostrará los datos de uno de los personajes del comic (no editables), estos son:
   - Imágen: Imágen del personaje.
   - Nombre: Nombre completo del personaje.

Para el desarrollo de la práctica se han usado las siguientes funcionalidades/librerías/componentes:

- _react-native-router-flux_: Para la navegación entre componentes.
- _Animated_: Para mostrar y ocultar imágenes en las pantallas de detalle así como las rotaciones en la lista de personajes.
- _axios_: Para la comunicaciones con la API de marvel
- _Redux_: Para la mantenimiento del estado de la App.
- _FlatList_: Para mostrar las listas de comics y personajes de un comic.
- _Formularios_: Se han implementados dos formularios, uno para dar de alta un comic y otro para la edición de los mismos. Destacar que como la API de Marvel no permite la modificación de datos, se ha simulado en la medida de lo posible, la actualización de los comics. Se ha incluido un retardo de 2 segundos en cada acción de actualización.
