/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */
import env from '../../env';
import axios from 'axios';
import { useState, onChange, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from "./BackButton";
import ClientModel from '../../models/ClientModel';
import ServiceModel from '../../models/ServiceModel';


// view that has a form where I can modify  
// information of a specifique client by its id

function ModifyClient() {


    const [client, setClient] = useState(new ClientModel());
    const [error, setError] = useState({});
    const [service, setService] = useState(new ServiceModel());

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
    });

    const [neighborhood_id, setNeighborhood_id] = useState("");
    console.log(id);
    // validate essencial fields 
    function handleForm(ev) {
        ev.preventDefault();
        console.log(ev.target);
        // create a new cliente instance and set the values from the 
        //form inputs to corresponding fields in the model class

    };

    return (
        <>
            <BackButton />
            <h3 className="mt-3" >Moficar información del cliente</h3>
            { /** execute a function to handle the form when submit event is generate */}

            <p> {client.first_name}</p>

        </>
    );
};

export default ModifyClient;