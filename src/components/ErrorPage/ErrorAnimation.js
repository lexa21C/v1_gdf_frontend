import React, { useEffect } from 'react';
// import './ErrorAnimation.css';

function ErrorAnimation() {
  useEffect(() => {
    let loop1, loop2, loop3;
    let time = 30;
    let i = 0;

    function randomNum() {
      return Math.floor(Math.random() * 9) + 1;
    }

    const selector3 = document.querySelector('.thirdDigit');
    const selector2 = document.querySelector('.secondDigit');
    const selector1 = document.querySelector('.firstDigit');

    loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = 4;
      } else {
        selector3.textContent = randomNum();
        i++;
      }
    }, time);

    loop2 = setInterval(() => {
      if (i > 80) {
        clearInterval(loop2);
        selector2.textContent = 0;
      } else {
        selector2.textContent = randomNum();
        i++;
      }
    }, time);

    loop1 = setInterval(() => {
      if (i > 100) {
        clearInterval(loop1);
        selector1.textContent = 4;
      } else {
        selector1.textContent = randomNum();
        i++;
      }
    }, time);

    // Limpiar los intervalos cuando el componente se desmonte
    return () => {
      clearInterval(loop1);
      clearInterval(loop2);
      clearInterval(loop3);
    };
  }, []);

  return null; // No se renderiza nada en el componente ErrorAnimation
}

export default ErrorAnimation;
