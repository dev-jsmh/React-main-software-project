/**
 * Jhonatan Samuel Martinez Hernandez 
 * Ficha 2675859
 * Analisis y Desarrollo de Software
 * Año 2024
 */

import { useNavigate } from 'react-router-dom'

function BackButton() {

    // Use here the useNavigate hook 
    const navigate = useNavigate();
    // defined a click handler
    const handleClick = () => {
        // implement the navigate hook and past the desired destination route
        navigate(-1);
    };

    return (
        <button onClick={handleClick} className="btn btn-success mt-3">
            <i className="bi bi-arrow-left"></i>
        </button>
    );

};

// export by default this function so I can access it from other components
export default BackButton;