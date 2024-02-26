import React, { useState } from 'react';
import * as Reactstrap from "reactstrap";

const InputValidation = ({ label, type, placeholder, name, onChange, minLength,  maxLength,rows, value, setIsValid,secondDate,isEditable  }) => {
  // Estados para almacenar el valor del input y el mensaje de error
  const [inputValue, setInputValue] = useState(value);
  const [errorMessage, setErrorMessage] = useState('');

  // Función para validar el valor del input según el tipo y reglas de validación
  const validateInput = (inputValue) => {
    // Aquí defines todas las reglas de validación que desees
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const numberRegex = /^[0-9]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validación de campo vacío
    if (inputValue.trim() === '') {
      return 'Este campo es obligatorio.' ;
    }
    if (type === 'text' && maxLength && inputValue.length >= maxLength) {
       return `El valor no debe tener más de ${maxLength} caracteres.`;
     }
     /// validacion type text
     if (type === 'text' && minLength && inputValue.length < minLength) {
       return `El valor debe tener al menos ${minLength} caracteres.`;
     }
    // Resto de las reglas de validación...
    if (type === 'email' && !emailRegex.test(inputValue)) {
      return 'Ingrese una dirección de correo electrónico válida.';
    }

    if (type === 'select' && !emailRegex.test(inputValue)) {
      return 'Ingrese una dirección de correo electrónico válida.';
    }

    

      // Validación de longitud mínima para textarea
  if (type === 'textarea' && minLength && inputValue.length < minLength) {
    return `El valor debe tener al menos ${minLength} caracteres.`;
  }

  if ((type === 'text' || type === 'textarea') && numberRegex.test(inputValue)) {
    return 'Este campo no debe contener números.';
  }

    if (type === 'number') {
      if (!numberRegex.test(inputValue)) {
        return 'Ingrese solo números.';
      }
      if (minLength && inputValue.length < minLength) {
        return `El valor debe tener al menos ${minLength} caracteres.`;
      }
    }

    if (type === 'textPassword' && !passwordRegex.test(inputValue)) {
      return 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }

    if (type === 'password' && !passwordRegex.test(inputValue)) {
      return 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }

    if (type === 'date') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(inputValue)) {
        return 'Ingrese una fecha válida en el formato YYYY-MM-DD.';
      }

      if (label === 'Fecha inicial') {
        const startDateValue = new Date(inputValue);
        const endDateValue = new Date(secondDate);
        if (startDateValue >= endDateValue) {
          return 'La fecha inicial debe ser menor que la fecha final.';
        }
      }

      
      if (label === 'Fecha final') {
        const endDateValue = new Date(inputValue);
        const startDateValue = new Date(secondDate);
        if (endDateValue <= startDateValue) {
          return 'La fecha final debe ser mayor que la fecha inicial.';
        }
      }
    }

    return '';
  };


  // Función para manejar el cambio de valor en el input
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue); // Llamar al prop onChange para pasar el valor del input

    // Validar el valor del input
    const error = validateInput(newValue);
    setIsValid(error === ''); // Actualizar el estado isValidForm en CreateResult
    setErrorMessage(error);
  };

  return (
    <div>
      {/* Input del componente */}
      <Reactstrap.Input
        type={type}
        value={value}
        onChange={handleInputChange}
        className={`form-control-alternative ${errorMessage ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        name={name}
        rows={rows}
        required={true}  // Asegurarse de que el input tenga el atributo required si es obligatorio
        // disabled={!isEditable && name === 'code'}
        
      />

      {/* Mostrar mensaje de error si la validación falla */}
      {errorMessage && <div style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</div>}
    </div>
  );
};

export default InputValidation;
