import React from "react";
import "./App.css";
import Links from "./components/Links";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

function App() {
    return (
        <div className="bg-gray-900">
            <p className="w-full text-right text-white text-xs pr-2 pt-2">
                Hecho por{" "}
                <a
                    href="https://github.com/JaviCeRodriguez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-yellow-500"
                >
                    Javier
                </a>{" "}
                con muchos 🧉
            </p>
            <Links />
            <ToastContainer />
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Guarda tus sitios webs favoritos! Quedarán almacenados en nuestra base de datos. Pueden agregar, editar y borarr enlaces!"
                />
                <meta
                    name="keywords"
                    content="enlaces, links, base de datos, bd, firestore, firebase, tailwind, css, reat, crud, create, read, update, delete, url, card"
                />
                <meta name="author" content="Javier Rodriguez" />
                <meta name="robots" content="index" />
                <meta name="robots" content="follow" />
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"
                ></link>
                <title>Enlaces favoritos</title>
            </Helmet>
        </div>
    );
}

export default App;
