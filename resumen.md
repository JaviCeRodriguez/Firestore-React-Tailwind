# Firebase: Firestore. CRUD con React (Parte 1/2)

## Resumen

Hola! Pensando en que podemos realizar ahora, se me ocurrió seguir con React (como mencioné en el post anterior) pero usando una base de datos o BD. Para esta ocación, vamos a utilizar Firestore de Firebse para crear un CRUD (Create Read Update Delete).
¿Qué tiene que ver con JavaScript? Casi nada pero debemos saber manipular una BD para poder realizar ciertas tareas, así que no viene mal aprender. En otro momento vamos a utilizar y aprender en más profundidad MongoDB. Tanto Firebase como Mongo, son NoSQL.

## Proyecto

Vamos a estar realizando un CRUD con React y Firebase. Esto lo hago a la par con un video de Fazt (famoso Youtuber desarrollador). Al final del artículo, dejo enlace del video.
Vamos a realizar un simple CRUD para almacenar tareas o enlaces! Antes de seguir, creen una nueva app con `create-react-app` para seguir con Firebase mientras.

## Entrando a Firebase

Firebase es un servicio de Google en el cual nos ofrece un backend. Al desarrollar un proyecto en frontend, casi seguro necesitemos el backend (conecarnos a una BD, obtener datos en tiempo real, autenticación y demás).
Utilizando Firebase, no nos preocuparemos por el backend porque ya está hecho. Para nuestro caso, vamos a utilizar el servicio gratuito, pero para cosas más serias, deberíamos dar un par de dólares para un mejor servicio.

Preparamos el entorno de Firebase entrando a su web. Debemos utilizar si o sí una cuenta de Gmail para continuar.
Lo siguiente será `Ir a la consola` > `Crear un proyecto`. Introducimos un nombre: `fb-crud-react` y continuamos. No vamos a necesitar la parte analítica del servicio de Firebase, lo podemos saltear.
Una vez creada nuestra BD, vamos a encontrarnos con el panel de administración:

-   **Authentication**: Para manejar cuentas de usuarios, hacer login y registro de usuarios. También podemos guardar datos relaciados con esto.
-   **Cloud Firestore**: Servicio nuevo, recomendado para utilizar.
-   **Realtime Database**: Primer servicio de Firebase
-   **Storage**: Podemos guardar datos estáticos.
-   **Hosting**: Podemos subir nuestro proyecto con algún framework.
-   **Functions**: Código que se ejecuta en la nube (serverless).
-   **Machine Learning**: Crear contenido, búsqueda inteligente.

## Limpiamos nuestra app React

Por un tema de simpleza, vamos a eliminar el contenido de `index.css`, `App.css` y eliminar el contenido del `return()` de `App.js`.

## Integración de Firebase con React

Vamos al ícono de engranaje abajo del logo y vamos a Configuración del proyecto. En la sección `Tus aplicaciones`, vamos a ver que no tenemos ninguna aplicación en nuestro proyecto, entonces agregaremos Firebase a nuestra app cliqueando el icono `</>`.

Entraremos a la pantalla `Añadir Firebase a tu aplicación web` y solo pondremos nuestroo nombre de la app u otro.

Esto nos crearía un script para insertar en HTML y otro para poder enlazarlo mediante SDK. Nosotros, como estamos con React, solo nos interesa el contenido del script con la configuración de Firebase. También colocamos un par de imports y un par de variables para ajustar el script a lo que necesitamos.
Esto lo colocaremos en nuestra app. Creamos un archivo llamada `firebase.js` en la carpeta `src`. Debería quedar algo así:

```js
import firebase form 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "unaSerieDeNumerosYLetras",
    authDomain: "nombreDeBDyAlgoMas.firebaseapp.com",
    projectId: "nombreDeBDyAlgoMas",
    storageBucket: "nombreDeBDyAlgoMas.appspot.com",
    messagingSenderId: "numerosporaca",
    appId: "1:numerosPorAca:web:otraSerieAlfaNumerica",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
// Uso el metodo firestore de firebase para la base de datos.
// Exporto la variable db para poder manipularla.
export const db = fb.firestore();
```

Una vez hecho esto, paramos la simulación e instalaremos Firebase con npm: `npm i firebase`. Con esto, ya podemos compilar bien con el script agregado.

Volvemos al dashboard y entraremos a `Cloud Firestore` y le damos click al botón `Crear base de datos`. Ahora tenemos dos opciones de inicio:

-   Iniciar en modo de prueba: Cualquiera puede escribir y leer. Útil para desarrollo sin tener mensajes de error/alerta.
-   Iniciar en modo de producción: Utilizamos autenticación, con reglas más estrictas.

Elegimos `modo de prueba` > `Siguiente` > `Siguiente` y listo. Con esto ya tenemos nuestra BD hecha y podemos realizar un poco más de codeo.
Como ya sabemos la teoría (si no, andá a los días anteriores en donde explico esto), puedo pasar el código directamente sin mucho que explicar:

-   `App.js` en carpeta `src`: Simplemente metemos un componente `Links`

```jsx
import React from "react";
import "./App.css";
import Links from "./components/Links";

function App() {
    return (
        <div className="">
            <Links />
        </div>
    );
}

export default App;
```

-   `Links.js` en carpeta `src/components`: Utilizamos el componente `LinkForm` e importamos lo que configuramos en un script para firebase. Este componente va a ser el encargado de subir la nueva entrada a la BD, creando una collection y doc nuevo (si ya existe la collection, solo crea un nuevo doc). De manera informativa, colocamos un console.log para saber si se subieron los cambios o si mínimamente entró a la función. Esto lo podemos chequear en la base de datos de Firestore.

```jsx
import React from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";

const Link = () => {
    const addOrEditLink = async (linkObject) => {
        await db.collection("links").doc().set(linkObject);
        console.log("Tarea agregada");
    };

    return (
        <>
            <LinkForm addOrEditLink={addOrEditLink} />
        </>
    );
};

export default Link;
```

-   `LinkForm` en carpeta `src/components`: Usaremos el hook useState para guardar los datos de los inputs, obtenemos los cambios de cada input y enviamos estos cambios al apretar el botón al componente padre `Links` mediante props.

```jsx
import React, { useState } from "react";

const LinkForm = (props) => {
    const initialStateValues = {
        url: "",
        name: "",
        description: "",
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({ ...initialStateValues });
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    className=""
                    placeholder="URL del sitio"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}
                />
            </div>
            <div>
                <input
                    type="text"
                    className=""
                    placeholder="Nombre del sitio"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
                />
            </div>
            <div>
                <textarea
                    name="description"
                    rows="3"
                    className=""
                    placeholder="Escribir una descripción"
                    onChange={handleInputChange}
                    value={values.description}
                ></textarea>
            </div>
            <button className="">Guardar</button>
        </form>
    );
};

export default LinkForm;
```

Con esto, deberíamos poder realizar una de las primeras funciones que es agregar datos a la BD de Firestore de Firebase.
En el próximo post, vamos a agregar más funcionalidades y le daremos estilo con [Tailwind CSS](https://tailwindcss.com/). También está la opción de agregar plantilas hechas con [Bootswash](https://bootswatch.com/), pero queda en decisión de cada uno que le es más cómodo.

Enlace del video en donde tomo referencia para esta publicación: [Fazt - React & Firebase Firestore CRUD](https://www.youtube.com/watch?v=Y9-UkL6ent4).

---

**Día 13/100**
