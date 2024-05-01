/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

import { useState, onChange } from 'react';
import BackButton from "./BackButton";
import ClientModel from '../../models/ClientModel';


// view that has a form where I can modify  
// information of a specifique client by its id

function ModifyClient() {

    const [dni, setDni] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secundtName, setSecundtName] = useState("");
    const [first_lastName, setFirst_lastName] = useState("");
    const [secund_lastName, setSecund_lastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [neighborhood_id, setNeighborhood_id] = useState("");

    // validate essencial fields 

    const emptyFormInputs = (firstName, first_lastName, phone) => {
        if (firstName === "" || first_lastName === "" || phone === "") {
            return true;
        }
    };

    function handleForm(ev) {
        ev.preventDefault();
        console.log(ev.target);
        // create a new cliente instance and set the values from the 
        //form inputs to corresponding fields in the model class
        let fieldsEmpty = emptyFormInputs(ev.target.firstName.value, ev.target.first_lastName.value, ev.target.phone.value);

        if (fieldsEmpty) {
            alert("first name, first last name and phone are mandatory !");
            // console.log()
        } else {
            const client = new ClientModel(dni, firstName, secundtName, first_lastName, secund_lastName, phone, address);
            console.log(client);
        }

    };

    return (
        <>
            <BackButton />
            <h3 className="mt-3" >Moficar información del cliente</h3>
            { /** execute a function to handle the form when submit event is generate */}
            <form onSubmit={(ev) => { handleForm(ev); }} class="form-group mb-3">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div className="mb-3">
                        <label className='form-label' htmlFor="client_id">Id</label>
                        <input
                        className='form-control'
                            id="client_id"
                            name="client_id"
                            type="text"
                            value="2948834"
                            disabled="true" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client_id_card">CC</label>
                            <input class="form-control" id="client_id_card" type="number" value={dni} onChange={ev => setDni(ev.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client_firstName">Primer nombre</label>
                            <input
                                class="form-control"
                                id="client_firstName"
                                name='firstName'
                                type="text"
                                value={firstName}
                                onChange={ev => setFirstName(ev.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client_secundtName">Segundo nombre</label>
                            <input
                                class="form-control"
                                id="client_secundtName"
                                name='secundtName'
                                type="text"
                                value={secundtName}
                                onChange={ev => setSecundtName(ev.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client_first_lastName">Primer apellido</label>
                            <input
                                class="form-control"
                                id="client_first_lastName"
                                name='first_lastName'
                                type="text"
                                value={first_lastName}
                                onChange={ev => setFirst_lastName(ev.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client_secund_lastName">Segundo apellido</label>
                            <input
                                class="form-control"
                                id="client_secund_lastName"
                                name='secund_lastName'
                                type="text"
                                value={secund_lastName}
                                onChange={ev => setSecund_lastName(ev.target.value)} />
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="mb-3">
                            <label class="form-label" for="client_phone">Teléfono</label>
                            <input
                                class="form-control"
                                id="client_phone"
                                name='phone'
                                type="number"
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client_address">Dirección</label>
                            <input
                                class="form-control"
                                id="client_address"
                                name='address'
                                type="text"
                                value={address}
                                onChange={ev => setAddress(ev.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client_neighborhood">Barrio</label>
                            <select class="form-select" id="client_neighborhood" name='neighborhood_id'>
                                <option selected>---</option>
                                <option value="san fernando">San fernando</option>
                                <option value="san fernando">La central</option>
                                <option value="san fernando">Los caracoles</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div class="mb-3 text-center">
                    <button class="btn btn-success mx-1" type="submit">Añadir</button>
                    <a class="btn btn-danger mx-1" href="" >Cancelar</a>
                </div>
            </form>
        </>
    );
};

export default ModifyClient;