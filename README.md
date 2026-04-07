# Practicar Sintaxis en Java

## Descripcion General
Esta es una apliacion web para reforzar los fundamentos de programacion, usando Java como lenguaje base.

Cuando sea la primera vez que visites la pagina automaticamente seras redireccionado a la vista `antes_de_comenzar`
ya que ahi se da un contexto para aprovechar al maximo esta pagina.

Cuando ya sea tu segunda o N visita, podras ver el `index` directamente. En el header aparecera un enlace que te llevara a la 
vista `antes_de_comenzar` por si quieres hecharle otro vistazo

Cuenta con secciones como
+ Condicionales
+ Ciclos
+ Arrays
+ Matrices
+ Funciones 
+ Strings

En las cuales se habla mas acerca de esos temas y vienen ejercicios de logica para practicar.

> [!NOTE]
> Hay 3 categorias de ejercicios: comprension de codigo, encuentra el bug, fill in the blank

## Tecnologias
+ Flask
+ HTML
+ CSS puro y algunas clases de utilidad


## Estructura del proyecto
### 📂 Descripción de Módulos Principales

#### **data/** - Base de datos de contenido
Contiene los ejercicios y contenido teórico organizados en **6 temas principales**:

| Carpeta | Contenido |
|---------|-----------|
| **arrays/** | Conceptos de arreglos unidimensionales, declaración, iteración |
| **ciclos/** | Bucles: for, while, do-while |
| **condicionales/** | Sentencias if, else, switch, operadores lógicos |
| **funciones/** | Declaración, parámetros, retorno de valores, recursión |
| **matrices/** | Arreglos bidimensionales, recorrido, manipulación |
| **strings/** | Cadenas de texto, métodos, concatenación, análisis |

**Cada tema contiene 4 archivos YAML:**
- `{tema}.yml` - Teoría resumida y tabla de ejercicios disponibles
- `entender.yml` - Ejercicios de comprensión (leer código y explicar)
- `diagnosticar.yml` - Ejercicios de debugging (encuentra el error)
- `construir.yml` - Ejercicios de completado (rellena los espacios en blanco)

#### **static/** - Recursos del cliente
- **CSS/** - Estilos visuales y temas de la aplicación
- **JS/** - Funcionalidad del lado cliente: carrusel interactivo, detección de primera visita

#### **templates/** - Interfaz de usuario
- `base.html` - Layout común (herencia en todas las páginas)
- `index.html` - Hub central con lista de temas disponibles
- `antes_de_comenzar.html` - Tutorial de bienvenida para primeras visitas
- **{tema}.html** - Página individual para cada tema con ejercicios
- **macros/** - Componentes Jinja2 reutilizables para renderizar dinámicamente los ejercicios

#### **Archivos raíz**
- `app.py` - Servidor Flask, rutas y lógica de renderización
- `requirements.txt` - Dependencias Python (Flask, PyYAML, etc.)
- `vercel.json` - Configuración de despliegue en Vercel
