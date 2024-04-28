/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

import { Outlet, Link} from 'react-router-dom';

// This is a view where is going to be render all

// the views related to manage clients


function ClientHomeModule() {

    // route definition for cliente module goes here
    return (
        <>
            <nav class="navbar navbar-expand-md bg-dark sticky-top" data-bs-theme="dark">
                <div class="container-fluid">
                <Link to={"/clients"} class="navbar-brand">Admistrar Clientes</Link>
                <Link to={"/"} class="navbar-brand">Home</Link>

{/* 
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav align-items-end">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Clientes
                                </a>
                            </li>


                        </ul>
                    </div> 
*/}
                </div>
            </nav>

            <div className="container">
                <Outlet />
            </div>

        </>

    );

};

export default ClientHomeModule;