/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios to make http request to the API
import axios from 'axios';
import BackButton from './BackButton';

// enviroment file 
import env from '../../env';
import Spinner from '../../components/spinner';

// other imports here ================================

// view that has a form where I can create clients 
// and add their information to data base
function CreateClient() {

    // function that opens manually a bootstrap modal window
    // takes as argument the name of the modal 
    // The variable "element" is a string type variable
    /* function openModal(element) {
 
         document.body.style.cssText += "overflow: hidden; padding-right: 18px; ";
         document.body.classList.add("modal-open");  // this is a css class fro bootstrap
         var modal = document.getElementById(element);
         modal.style.display = "block";
     };
 
     function modalClose(element) {
 
         document.body.style.overflow = "visible";
         document.body.style.paddingRight = "0px";
         document.body.classList.remove("modal-open");  // this is a css class fro bootstrap
         // selecting modal by its correspondign id numbers
         var modal = document.getElementById(element);
         modal.style.display = "none";
 
     };*/

    // defining an object with all the required data 
    const [formData, setFormData] = useState(
        {
            dni: "",
            first_name: "",
            secund_name: "",
            first_lastname: "",
            secund_lastname: "",
            phone: "",
            address: "",

        }
    );

    // set loading variable to show spinner 
    const [loading, setLoading] = useState(false);

    // implement useState to create a object that will contain error messages for each input field
    const [errors, setErrors] = useState({});
    // create a state for an array of neighborhoods
    const [neighborhoods, setNeighborhoods] = useState([]);
    const navigate = useNavigate();

    // make request to api neighborhood endpoind
    useEffect(() => {
        // get the array of neighborhooods
        axios.get(env.mainUrl + "/neighborhoods")
            .then(response => {
                setNeighborhoods(response.data);
            })
            .catch(error => { console.log(error) });

    }, []);

    // make post request to client api endpoint 
    function postClient(data) {
        // change value of variable loading to true
        setLoading(true);
        axios.post(env.mainUrl + "/clients", data)
            .then(res => {
                console.log(res.data);
                // set a time to set loading variable to false again
                setTimeout(() => {
                    setLoading(false);
                    // close the modal window
                    // modalClose("modalConfirmCreateClient");
                    // redirect to client table view 
                    navigate("/clients")
                }, 4000);


            })
            .catch(error => {
                console.error("Posting new client was not possible ! ", error);
               
                setTimeout(() => {
                    // set a time to set "loading" variable to false again
                    setLoading(false);
                }, 4000);
                // make a copy of the error object and add an atribute 
                // that will hold an other object with api related errors
                setErrors(prevState => {
                    return { ...prevState, api: error }
                })

            }
            )
    }


    // function to handle change event of inputs 
    const handleInput = (event) => { // pass the event generated when input changes as argument
        //desctructor here the event for accessing the name and  values of it
        const { name, value } = event.target;

        // set a new client object using the setClient function retrun by its hook
        setFormData({
            // make a copy of the client object
            ...formData,
            // access the name attribute of the input that has changed 
            // in order to modify it and also get the value of the input form 
            // to set it in the copy of client object
            [name]: value

        });
    };
    // validate essencial fields 
    const validateForm = (formData) => {

        // create other object with error messages
        const foundErros = {};

        if (formData.first_name === "") {
            foundErros.first_name = "The first name is mandatory";
        };
        if (formData.first_lastname === "") {
            foundErros.first_lastname = "The first last name is mandatory";
        };
        if (formData.phone === "") {
            foundErros.phone = "The phone is mandatory";
        };
        if (formData.address === "") {
            foundErros.address = "The address is mandatory";
        };
        /*
                if (formData.neighborhood === "") {
                    foundErros.neighborhood = "You must to select a neighborhood";
                };*/


        if (formData == null) {
            foundErros.emptyFormInput = "The form could not be submit as there is no client data";
        };

        setErrors(foundErros);
        // count the number of error found in the foundErrors object
        return Object.keys(foundErros).length === 0;

    };


    // function that executes some logic to handle the from data when submit event is triger
    const handleForm = (ev) => {
        // prevent default behaveour of the form 
        ev.preventDefault();

        // call function to validate client
        const isValid = validateForm(formData);

        if (isValid) {
            console.log(isValid);
            console.log("Sending post request to back-end......");

            // call the postClient function to send data to api 
            postClient(formData);
            console.log("Post request made successfully......");

        } else {
            console.warn("there are some missing data in the form !")
            console.warn(errors);
        }
    };

    return (
        // html code of the component 
        <>
            <BackButton />
            <h3 className="mt-3" >Añadir cliente</h3>
            {/** show a message when there is an error with the API */}
            {errors.api?.code && (<div style={{ color: "red" }} ><p>{errors.api?.code}. Error de connección a la API</p>
            <p>El servidor no esta disponible en este momento. Intente luego nuevamente.</p></div>)}

            { /** execute a function to handle the form when submit event is generate */}
            <form onSubmit={event => handleForm(event)} className="form-group mb-3">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="mb-3">
                            <label className="form-label" for="id_card">CC</label>
                            <input
                                className="form-control"
                                id="id_card"
                                name='id_card'
                                type="number"
                                value={formData.dni}
                                onChange={(e) => { handleInput(e) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="first_name">Primer nombre</label>
                            <input
                                className="form-control"
                                id="first_name"
                                name='first_name'
                                type="text"
                                value={formData.first_name}
                                onChange={(e) => { handleInput(e) }} />
                            {errors.first_name && (<p style={{ color: "red" }} > {errors.first_name}</p>)}
                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="secund_name">Segundo nombre</label>
                            <input
                                className="form-control"
                                id="secund_name"
                                name='secund_name'
                                type="text"
                                value={formData.secund_name}
                                onChange={(e) => { handleInput(e) }} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="first_lastname">Primer apellido</label>
                            <input
                                className="form-control"
                                id="first_lastname"
                                name='first_lastname'
                                type="text"
                                onChange={(e) => { handleInput(e) }} />
                            {errors.first_lastname && (<p style={{ color: "red" }} > {errors.first_lastname}</p>)}

                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="secund_lastname">Segundo apellido</label>
                            <input
                                className="form-control"
                                id="secund_lastname"
                                name='secund_lastname'
                                type="text"
                                value={formData.secund_lastname}
                                onChange={(e) => { handleInput(e) }} />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="mb-3">
                            <label className="form-label" for="phone">Teléfono</label>
                            <input
                                className="form-control"
                                id="phone"
                                name='phone'
                                type="number"
                                value={formData.phone}
                                onChange={(e) => { handleInput(e) }} />
                            {errors.phone && (<p style={{ color: "red" }} > {errors.phone}</p>)}

                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="address">Dirección</label>
                            <input
                                className="form-control"
                                id="address"
                                name='address'
                                type="text"
                                value={formData.address}
                                onChange={(e) => { handleInput(e) }} />
                            {errors.address && (<p style={{ color: "red" }} > {errors.address}</p>)}

                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="neighborhood">Barrio</label>
                            <select
                                className="form-select"
                                id="neighborhood"
                                name='neighborhood'>
                                <option >---</option>
                                {
                                    // iterate the neighborhood array and return a option element for each neighborhood
                                    neighborhoods.map(neighborhood => (
                                        <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                    ))

                                }
                                {/** some example neighborhoods */}
                                <option value={"Caracoles"} >Caracoles</option>
                                <option value={"Central"} >La Central</option>

                            </select>
                            {errors.neighborhood && (<p style={{ color: "red" }} > {errors.neighborhood}</p>)}
                        </div>

                    </div>
                </div>
                <div className="mb-3 text-center">
                    <button
                        className="btn btn-success mx-1"
                        type='submit'> {loading ? <Spinner /> : "Añadir"}
                    </button>
                    <Link className="btn btn-danger mx-1" to="/clients" >Cancelar</Link>
                </div>
            </form>


            {/** modal window to confirm creation of new client */}
            <div className="modal" id="modalConfirmCreateClient">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">


                        </div>
                        <div className="modal-footer">
                            <button
                                className='btn btn-secundary'
                                type="button"
                                onClick={() => {
                                    // this condition is to prevent making a post 
                                    // request to the api since it is possible in the 
                                    // first render of the component

                                    if (formData.first_name !== "") {
                                        postClient(formData)
                                    }
                                }
                                }
                            >si</button>
                            <button
                                className='btn btn-primary'
                                type="button"
                            >NO</button>
                        </div>
                    </div>
                </div>
            </div >
        </>

    );
};

export default CreateClient;