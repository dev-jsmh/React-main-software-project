/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

import BackButton from "./clientModule/BackButton";

export default function NotFound() {

// returns a page with a message when resource is not found
    return (
      
        <div class="row">
            <div class="col-12 mt-5 text-center">
                <h1>Pagina en desarrollo</h1>
                <p>
                    Esta función esta en desarrollo
                </p>
                <p>
                    Muy pronto estará disponible
                </p>
                <div class="img">
                    <i class="bi bi-tools" style="font-size: 3rem;
                    font-weight: bold;color: aliceblue;"></i>
                </div>
               <BackButton></BackButton>
            </div>
        </div>
 
    
    );
};