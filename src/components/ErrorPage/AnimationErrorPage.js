import React from 'react';
import './ErrorPage.css';
import ErrorAnimation from './ErrorAnimation.js';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className='sectionError d-flex align-items-center justify-content-center'>
    <div className="error w-100">
      <div className="container-floud">
        <div className="col-xs-12 ground-color text-center">
          <div className="container-error-404">
            <div className="clip">
              <div className="shadow">
                <span className="digit thirdDigit"></span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit secondDigit"></span>
              </div>
            </div>
            <div className="clip">0
              <div className="shadow">
                <span className="digit firstDigit"></span>
              </div>
            </div>
            <div className="msg">
              Ups!<span className="triangle"></span>
            </div>
          </div>
          <h2 className="h1">¡Lo siento! Página no encontrada</h2>
          <a className='text-info'onClick={() => navigate(-1)} >Regresar a la pagina anterior</a>
        </div>
      </div>
      <ErrorAnimation />
    </div>
    </section>

  );
}

export default ErrorPage;
