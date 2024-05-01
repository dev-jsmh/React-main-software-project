
/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */


/**
 * 
 * import { NeighborhoodModel } from "./NeighborhoodModel";
import { ServiceModel } from "./ServiceModel";
import { ProductModel } from "./ProductModel";

 * 
 */

export default class ClientModel {

    id;
    dni;
    first_name;
    secund_name;
    first_lastname;
    secund_lastname;
    phone;
    address;
    neighborhood;
    last_meet;
    image;
    purchased_services;
    products;

    // Empty constructor

    // constructor with basic client contact data
    constructor(
        dni,
        first_name,
        secund_name,
        first_lastname,
        secund_lastname,
        phone,
        address,


    ) {
        this.dni = dni;
        this.first_name = first_name;
        this.secund_name = secund_name;
        this.first_lastname = first_lastname;
        this.secund_lastname = secund_lastname;
        this.phone = phone;
        this.address = address;


    }
}
