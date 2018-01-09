
![Logotipo Chef](/images/logo.png)

# chef-layout

Es una pequeña librería **flexbox** de estilos **autogenerativos**, esta posee la capacidad de replicar estilos para un determinado grupo de **media query**
a continuación se enseña un ejemplo de lo simple que es replicar estilos con chef

### Instalacion

### HTML

> Se recomienda este proceso de instalacion ya que la carga del css generativo por chef, queda independiente del bundle

```html
<!--
Carga chef de forma asíncrona
-->
<script async
        onload="mainChef()"
        src="https://cdn.jsdelivr.net/npm/chef-layout@0.0.3/umd.min.js"></script>  
<!--
Inicializa chef una vez éste haya cargado
-->
<script>
function mainChef(){
    Chef.default();
    Chef.columns(20);
}
</script>
```

### NPM

```bash
npm install -D chef-layout
```

``` javascript
import Chef from 'chef-layout';
    Chef.default();
    Chef.columns(20);
```

### Input

entrada a procesar

```css
.row@prefix{
   display:flex;
   flex-flow : row wrap;
}
```

### Output

css impreso en el documento html

```css
.row{
   display:flex;
   flex-flow : row wrap;
}
@media (max-width:1440px){
   .row_xl{
       display:flex;
       flex-flow : row wrap;
   }  
}
@media (max-width:1280px){
   .row_l{
       display:flex;
       flex-flow : row wrap;
   }  
}
@media (max-width:1024px){
   .row_m{
       display:flex;
       flex-flow : row wrap;
   }  
}
@media (max-width:768px){
   .row_s{
       display:flex;
       flex-flow : row wrap;
   }  
}
@media (max-width:414px){
   .row_xs{
       display:flex;
       flex-flow : row wrap;
   }  
}
```

## Layout Flex-Box

por defecto chef se creo para trabajar replicando estilos **flex-box**, por lo que incorpora esta pila por defecto.

### Clases de contención

#### .row

contenedor al 100% del largo que apila su contenido de forma **horizontal** y en 
**cascada**

```css
.row{
   width: 100%;
   height: auto;
   display: flex;
   box-sizing: border-box;
   flex-flow: row wrap;
}
```

#### .column

contenedor al 100% del largo que apila su contenido solo de forma vertical

```css
.column{
   width: 100%;
   height: auto;
   display: flex;
   box-sizing: border-box;
   flex-flow: column nowrap;
}
```

#### .inline

contenedor que resetea el largo a automatico y modifica la propiedad display flex por inline-flex

```css
.inline{
   width: auto;
   display:inline-flex;
}
```

### Clases de modificación

#### .row.top

permite apilar el contenido en la parte superior del contenedor

![Ejemplo de alineación](/images/top.jpg)

```css
.row.top{
   align-items:flex-start
}
```
#### .column.top

permite apilar el contenido en la parte superior del contenedor

![Ejemplo de alineación](/images/top.jpg)

```css
.column.top{
   justify-content:flex-start
}
```
#### .row.right

permite apilar el contenido en la parte derecha del contenedor

![Ejemplo de alineación](/images/right.jpg)

```css
.row.right{
   justify-content:flex-end
}
```

#### .column.right

permite apilar el contenido en la parte derecha del contenedor

![Ejemplo de alineación](/images/right.jpg)

```css
.column.right{
   align-items:flex-end
}
```
#### .row.bottom

permite apilar el contenido en la parte inferior del contenedor

![Ejemplo de alineación](/images/bottom.jpg)

```css
.row.bottom{
   align-items:flex-end
}
```

#### .column.bottom

permite apilar el contenido en la parte inferior del contenedor

![Ejemplo de alineación](/images/bottom.jpg)

```css
.column.bottom{
   justify-content:flex-end
}
```

#### .row.left

permite ampliar el contenido en la parte izquierda del contenedor

![Ejemplo de alineación](/images/left.jpg)

```css
.row.left{
   justify-content:flex-start
}
```

#### .column.left

permite ampliar el contenido en la parte izquierda del contenedor

![Ejemplo de alineación](/images/left.jpg)

```css
.column.left{
   align-items:flex-start
}
```

#### .row.middle

permite apilar el contenido al centro del en el eje Y

![Ejemplo de alineación](/images/middle.jpg)

```css
.row.middle{
   align-items:center
}
```

#### .column.middle

permite apilar el contenido al centro del en el eje Y

![Ejemplo de alineación](/images/middle.jpg)

```css
.column.middle{
   justify-content:center
}
```

#### .row.center

permite apilar el contenido al centro del en el eje X

![Ejemplo de alineación](/images/center.jpg)

```css
.row.center{
   justify-content:center
}
```

#### .column.center

permite apilar el contenido al centro del en el eje X

![Ejemplo de alineación](/images/center.jpg)

```css
.row.center{
   align-items:center
}
```

#### .centered

permite apilar todo el contenido al centro

![Ejemplo de alineación](/images/centered.jpg)

```css
.centered{
   justify-content:center;
   align-items:center;
}
```

### Clases de propiedad

#### .split

otorga la propiedad de ancho autoajustable

![Ejemplo de alineación](/images/split.jpg)

```css
.split{
   flex-grow: 1;
   flex-shrink: 1;
   flex-basis: 0%;
}
```

#### .auto

resetea la propiedad autoajustable

```css
.auto{
   flex-grow: 0;
   flex-shrink: 0;
   flex-basis: auto;
}
```

## Configuracion opcional

#### Chef.cache

Permite cachear el css preprocesado con localstorage

```javascript
Chef.cache = true;
```

#### Chef.prefix

Permite añadir prefijo a los nombres de clases asignados a chef

```javascript
Chef.prefix = 'chef-';
```
