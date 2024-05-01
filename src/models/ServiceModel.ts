/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

// A class that represents the concept of a service 
// containing  basic information for it

export class ServiceModel {
    service_id: number;
    date!: String;
    description!: String;
    estimate_value!: number;
    

    constructor() { }

    // =================== getters ===================
    public getId(): number {
        return this.service_id;
    };

    public getDate(): String {
        return this.date;
    };

    public getDescription(): String {
        return this.description;
    };

    public getEstimate_value(): number {
        return this.estimate_value
    };

    // =================== setters ===================
    public setDate(date: String): void {
        this.date = date
    };

    public setDescription(description: String): void {
         this.description = description;
    };

    public setEstimate_value(value: number): void {
         this.estimate_value = value;
    };
    
}
