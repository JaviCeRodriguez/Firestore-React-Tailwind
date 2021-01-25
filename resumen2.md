# Firebase: Firestore. CRUD con React (Parte 2/2)

## Resumen

Segunda parte! Ya tenemos la BD y la función de enviar nuevos datos a ella en nuestra app. Ahora implementaremos las funciones de editar y borrar links por id, y mostrar un listadoo de links que están en nuestra BD y que actualiza con cada cambio que hagamos.
Al final, le vamos a dar estilo con Tailwind CSS y pondremos un par de iconos para que esté mejor visualmente.

## Nuevos cambios en la app

Para no marearlos entre ir y volver entre archivos, editando y borrando partes de código, voy a mostrarles el resultado final de cada archivo con las nuevas funcionalidades agregadas!

Antes del código, estamos utilizando un complemento llamado Toastify. Esto nos sirve para enviar notificaciones que se cierran automáticamente. Para más información, pueden consultar con la [documentación](https://github.com/fkhadra/react-toastify).

-   En `App.js` de `src`: Realizo el import de Toastify y lo agrego como componente dentro del return de App.

```jsx
import React from "react";
import "./App.css";
import Links from "./components/Links";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="">
            <Links />
            <ToastContainer />
        </div>
    );
}

export default App;
```

-   En `Links` de `src/components`: Agrego y edito funciones que me ayudarán en las consultas a la BD y envío de notificaciones con Toastify.

```jsx
import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Link = () => {
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("");

    // Links nuevos o actualizados
    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === "") {
                await db.collection("links").doc().set(linkObject);
                toast("Nuevo enlace agregado", {
                    type: "success",
                    autoClose: 2000,
                });
            } else {
                await db.collection("links").doc(currentId).update(linkObject);
                toast("Enlace actualizado", {
                    type: "info",
                    autoClose: 2000,
                });
                setCurrentId("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Eliminar link
    const onDeleteLink = async (id) => {
        if (window.confirm("Seguro de que querés eliminar el enlace?")) {
            await db.collection("links").doc(id).delete();
            toast("Enlace eliminado", {
                type: "error",
                autoClose: 2000,
            });
        }
    };

    // Obtengo links de BD
    const getLinks = async () => {
        db.collection("links").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    };

    // En cada actualización, ejecuto getLinks
    useEffect(() => {
        getLinks();
    }, []);

    return (
        <>
            <LinkForm {...{ addOrEditLink, currentId, links }} />
            <div>
                {links.map((link) => (
                    <div className="" key={link.id}>
                        <div>
                            <h4>{link.name}</h4>
                            <div>
                                <button onClick={() => onDeleteLink(link.id)}>
                                    Delete
                                </button>
                                <button onClick={() => setCurrentId(link.id)}>
                                    Editar
                                </button>
                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Entrar al enlace
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Link;
```

-   En `LinkForm` de `src/components`: Aquí agrego funciones y hooks para poder manipular la información de los campos y enviar al componente padre.

```jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const LinkForm = (props) => {
    // Estado inicial para campos
    const initialStateValues = {
        url: "",
        name: "",
        description: "",
    };

    // useState para guardar datos de campos
    const [values, setValues] = useState(initialStateValues);

    // Guardo datos nuevos de campos en las variables de useState
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    // Envio datos a padre Links y limpio los campos
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({ ...initialStateValues });
    };

    // Obtiene un link guardado en DB por id
    const getLinkById = async (id) => {
        const doc = await db.collection("links").doc(id).get();
        setValues({ ...doc.data() });
    };

    // useEffect para determinar si hay cambios en el currentId (pasado por props)
    useEffect(() => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues });
        } else {
            getLinkById(props.currentId);
        }
        // eslint-disable-next-line
    }, [props.currentId]);

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
            <button className="">
                {props.currentId === "" ? "Guardar" : "Actualizar"}
            </button>
        </form>
    );
};

export default LinkForm;
```

Esto que tenemos ahora, es un CRUD funcional en donde podrán agregar, leer, editar y eliminar enlaces, por medio de consultas a la BD Firestore de Firebase.

¿Qué falta a esta app? Bueno, muchas cosas...

-   Validación de campos (mediante RegEx, por ejemplo)
-   Agregar eventos de teclado (Enter, atajos con alguna letra, etc)
-   Autenticación para evitar que cualquiera pueda editar esta app.

Confío en la gente de internet (cosa que está mal) y voy a dejar un live demo de esta app para que puedan probarlo.

Dejo, junto con el enlace del demo, el repositorio en donde van a poder ver esta misma app pero con Tailwind integrado. Les dejo la app sin estilos para que puedan personalizarla sin problemas, pero pueden ver la versión del repositorio.

-   [Repositorio del proyecto]()
-   [Live demo]()
