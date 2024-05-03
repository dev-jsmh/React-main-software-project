/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

import { onChange, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios to make http request to the API
import axios from 'axios';
import BackButton from './BackButton';

// enviroment file 
import env from '../../env';

import ClientModel from '../../models/ClientModel';
// view that has a form where I can create clients 
// and add their information to data base


function CreateClient() {

    // defining an object with all the required data 

    const [formData, setFormData] = useState(
        {
            id: "",
            dni: "",
            first_name: "",
            secund_name: "",
            first_last_name: "",
            secund_last_name: "",
            phone: "",
            address: "",
            neighborhood: "",

        }
    );

    // implement useState to create a object that will contain error messages for each input field
    const [errors, setErrors] = useState({});
    // create a state for an array of neighborhoods
    const [neighborhoods, setNeighborhoods] = useState([]);
    // make request to api neighborhood endpoind
    useEffect(() => {
        // get the array of neighborhooods
        axios.get(env.mainUrl + "/neighborhoods")
            .then(response => {
                setNeighborhoods(response.data);
            })
            .catch(error => { console.log(error) });

    }, []);


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

        if (formData == null) {

            foundErros.emptyFormInput = "The form could not be submit as there is no client data";
        };
        if (formData.first_name === "") {
            foundErros.first_name = "The first name is mandatory";
        };
        if (formData.first_last_name === "") {
            foundErros.first_last_name = "The first last name is mandatory";
        };
        if (formData.phone === "") {
            foundErros.phone = "The phone is mandatory";
        };
        if (formData.address === "") {
            foundErros.address = "The address is mandatory";
        };

        if (formData.neighborhood === "---") {
            foundErros.neighborhood = "You must to select a neighborhood";
        }

        setErrors(foundErros);

        return Object.keys(foundErros) === 0;
    };

    // function that executes some logic to handle the from data when submit event is triger
    const handleForm = (ev) => {
        // prevent default behaveour of the form 
        ev.preventDefault();
        //console.log(ev.target);
        console.log(formData);
        // call function to validate client
        validateForm(formData);
    };

    return (
        // html code of the component 
        <>
            <BackButton />
            <h3 className="mt-3" >Añadir cliente</h3>
            { /** execute a function to handle the form when submit event is generate */}
            <form onSubmit={(ev) => { handleForm(ev) }} className="form-group mb-3">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="mb-3">
                            <label className="form-label" for="id_card">CC</label>
                            <input
                                className="form-control"
                                id="id_card"
                                name='id_card'
                                type="number"
                                onChange={(e) => { handleInput(e) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="first_name">Primer nombre</label>
                            <input
                                className="form-control"
                                id="first_name"
                                name='first_name'
                                type="text"
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
                                onChange={(e) => { handleInput(e) }} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="first_last_name">Primer apellido</label>
                            <input
                                className="form-control"
                                id="first_last_name"
                                name='first_last_name'
                                type="text"
                                onChange={(e) => { handleInput(e) }} />
                            {errors.first_last_name && (<p style={{ color: "red" }} > {errors.first_last_name}</p>)}

                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="secund_last_name">Segundo apellido</label>
                            <input
                                className="form-control"
                                id="secund_last_name"
                                name='secund_last_name'
                                type="text"
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
                                onChange={(e) => { handleInput(e) }} />
                            {errors.address && (<p style={{ color: "red" }} > {errors.address}</p>)}

                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="neighborhood">Barrio</label>
                            <select
                                className="form-select"
                                id="neighborhood"
                                name='neighborhood'
                                onChange={(e) => handleInput(e)}>
                                <option value="---">---</option>
                                {
                                    // iterate the neighborhood array and return a option element for each neighborhood
                                    neighborhoods.map(neighborhood => (
                                        <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                    ))

                                }

                            </select>
                            {errors.neighborhood && (<p style={{ color: "red" }} >errors.neighborhood</p>)}
                        </div>

                    </div>
                </div>
                <div className="mb-3 text-center">
                    <button className="btn btn-success mx-1" type="submit" >Añadir</button>
                    <Link className="btn btn-danger mx-1" to="/clients" >Cancelar</Link>
                </div>
            </form>




        </>

    );
};

export default CreateClient;