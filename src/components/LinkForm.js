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
        <form
            className="flex flex-col items-center border-2 border-red-500 rounded-sm w-72 m-4"
            onSubmit={handleSubmit}
        >
            <h4 className="text-white font-semibold m-2">
                Agrega sitios tus web favoritos!{" "}
                <i class="fas fa-star text-yellow-500"></i>
            </h4>
            <div className="flex justify-center items-center m-2 w-full">
                <i class="fas fa-link text-white mr-2"></i>
                <input
                    type="text"
                    className="w-48 p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="URL del sitio"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}
                    required
                />
            </div>
            <div className="flex justify-center items-center m-2 w-full">
                <i class="fas fa-user text-white mr-2"></i>
                <input
                    type="text"
                    className="w-48 p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Nombre del sitio"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
                    required
                />
            </div>
            <div className="flex justify-center items-center m-2 w-full">
                <i class="far fa-edit text-white mr-2"></i>
                <textarea
                    name="description"
                    rows="3"
                    className="w-48 p-1 resize-none rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Escribir una descripción"
                    onChange={handleInputChange}
                    value={values.description}
                    required
                ></textarea>
            </div>
            <button className="bg-yellow-500 m-2 font-semibold w-56 h-12 rounded-sm hover:bg-yellow-400">
                {props.currentId === "" ? "Guardar" : "Actualizar"}
            </button>
        </form>
    );
};

export default LinkForm;
