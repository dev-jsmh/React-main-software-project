/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

import { Link, useParams, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useEffect, useState } from "react";
import axios from "axios";
import env from '../../env';
import ClientModel from "../../models/ClientModel";

// View where I can fetch a client and check all it's 
// información by its id

function DetailsClient() {

    // state variables 
    const [client, setClient] = useState(new ClientModel());
    const [error, setError] = useState({});
    const navigate = useNavigate();
    // take the client id from url 
    const { id } = useParams();
    // make call to clients endpoint and search a specific client by its id
    useEffect(() => {
        // http://localhost:8080/api/v1/clients/:id
        axios.get(env.mainUrl + "/clients/" + id)
            // print result in console when I got it 
            .then(res => {
                console.log(res.data)
                // store client fetch from api in a state variable 
                setClient(res.data);
            })// print error message if error happends
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, []);


    // ===================== Delete client  =====================

    function deleteClient(client_id) {

        axios.delete(env.mainUrl + "/clients/" + client_id)
            .then(res => {
                console.info("client with id: " + client_id + " was successfully deleted !")
                // redirect to clients table view
                navigate("/clients");

            })
            .catch(error => {
                console.error("Was not possible to delete client id: " + client_id + " beacuse... ", error);
                setError((prevState) => { return { ...prevState, delete: error.message } })
            })
    }

    // ========================== Html code of the view ========================
    return (
        <>
            <BackButton />
            {error.delete && (<p style={{ color: "red" }}>{error.delete}: !El cliente selecionado ha sido eliminado anteriormente !</p>)}
            {error.message && (<div style={{ color: "red" }} >
                <p>{error.message}</p>
                <p>El servidor no esta disponible en este momento. Porfavor intente mas tarde.</p>
            </div>)}
            {/** <!-- informacion del cliente--> */}
            <div className="row  my-4 border">
                <h3 className="text-center">Detalles del cliente</h3>
                {/* foto del cliente*/}
                <div className="col-md-4 mb-3">
                    <img style={{ maxWidth: "13rem", height: "auto" }} src="" alt="client_profile_foto" />
                </div>
                <div className="col-md-8 mb-3">
                    { /* información basica del cliente */}
                    <div className="col-12 col-md-9 px-2 mb-3">
                        <div className="row">
                            <div className="mb-3">
                                id: {id}
                            </div>
                            <div className="mb-1">
                                <p>
                                    Nombre: {client.first_name} {client.secund_name} {client.first_lastname}
                                    {client.secund_lastname}
                                </p>
                            </div>
                            <div className="mb-3">
                                Telefono: {client.phone}
                            </div>
                            <div className="mb-3">
                                Dirección: {client.address}
                            </div>
                            <div className="mb-3">
                                Barrio: {client.neighborhood?.name}
                            </div>
                            <div className="mb-3">
                                Fecha ultimo mantenimiento: {client.last_maintenance}
                            </div>
                            <div className="mb-3">
                                Fecha proximo mantenimiento: {client.next_maintenance}
                            </div>
                            {/** accion buttons */}
                            <div className="mb-3">
                                <button className="btn btn-danger m-1"
                                    onClick={
                                        /** use and arrow function inside the click event handlesr to 
                                         * avoid executing the delete request when rendering the component*/
                                        () => {
                                            deleteClient(id)
                                        }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                                <Link
                                    className="btn btn-warning m-1"
                                    to={"/clients/" + id + "/modify"}>
                                    <i className="bi bi-pencil"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >

            </div >
            {/** lista de productos y servicios  */}
            <div className="row justify-content-center">
                { /** lista de productos adquiridos por el cliente */}
                <div className="col-12 col-md-5 border innerMargin">
                    <h3 className="mt-4">Lista de servicios adquiridos</h3>
                    <div className="scrollable" style={{ height: "300px", overflowY: "scroll" }}>
                        {/** show a list of purchase products by the client  */}
                        <div>
                            {client.purchased_services > 0 ? <>
                                <p>productos comprados</p>

                                {client.purchased_services.map(service => (
                                    <>
                                        <div> {service.service_id}</div>
                                        <div>{service.date}</div>
                                        <div>{service.estimated_value}</div>
                                        <div>{service.description}</div>
                                    </>
                                ))}</> :
                                <div className="d-flex justify-content-center align-items-center my-4">
                                    {/** show message if client has no buy any product  */}
                                    <p className="py-5">No se han facturado servicios al momento</p>
                                </div>
                            }

                        </div>

                    </div>
                </div>

                <div className="col-12 col-md-5 border innerMargin">
                    {/**  lista de servicios adquiridos por el cliente */}
                    <h3 className="mt-4">Lista de productos adquiridos</h3>
                    {/** scrollable container for the services the client has been charge for */}
                    <div style={{ height: "300px", overflowY: "scroll" }}>


                        <div>
                            {/** iterate over the array of services that belongs to the client */}
                            {client.products > 0 ? <>
                                {/** show the list of products bought for the client if the list has at least 1 */}
                                <p> Productos comprados</p>

                                {client.products.map(product => (
                                    <>
                                        <div> {product.productCode}</div>
                                        <div>{product.name}</div>
                                        <div>{product.model}</div>

                                    </>
                                )
                                )
                                }</> :
                                <>
                                    <div className="d-flex justify-content-center align-items-center my-4">
                                        {/** show message if client has no buy any product  */}
                                        <p className="py-5">No ha comprado productos al momento</p>
                                    </div>
                                    { /** -- End of default themplate for the if statement -- */}
                                </>

                            }
                            {/** ---- end of the if condicional statement ---- */}


                        </div>


                    </div >

                </div>
            </div>

            {/** modal window to confirm creation of new client */}
            <div className="modal" id="modalConfirmModifyClient">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>¿ Desea Modificar los datos de este cliente ?</p>
                        </div>
                        <div className="modal-footer">
                            <Link className='btn btn-secundary'>si</Link>
                            <button
                                className='btn btn-primary'
                                type="button"
                                data-bs-dismiss="modal">NO</button>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

export default DetailsClient;