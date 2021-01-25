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
        <div className="flex flex-col items-center justify-evenly">
            <LinkForm {...{ addOrEditLink, currentId, links }} />
            <div className="flex flex-wrap justify-center">
                {links.map((link) => (
                    <div
                        className="bg-blue-900 border-red-600 border-l-4 rounded-sm w-72 p-2 m-4 shadow-md
                                   transform duration-200 hover:scale-110"
                        key={link.id}
                    >
                        <div className="flex justify-between">
                            <h4 className="font-bold text-white">
                                {link.name}
                            </h4>
                            <div>
                                <button onClick={() => onDeleteLink(link.id)}>
                                    <i class="far fa-trash-alt text-red-500 m-1"></i>
                                </button>
                                <button onClick={() => setCurrentId(link.id)}>
                                    <i class="far fa-edit text-green-500 m-1"></i>
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-white">{link.description}</p>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white"
                        >
                            Entrar al enlace
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Link;
