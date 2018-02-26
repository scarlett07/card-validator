const form = document.querySelector('#form');
//Validacion de CVV
const validateIfIsNumber = numero => {
  if (!/^([0-9])*$/.test(numero)) {

    return false;
  } else {
    return true
  }
};
//Validación tdc
const validateNumCard = num => {
  if (validateIfIsNumber(num)) {
    const numberCardInverse = num.split('').reverse();
  //  console.log(numberCardInverse);
    const digits = numberCardInverse.map((element, index) => {
      if (index % 2 !== 0) { //aqui tomamos las posiciones pares para sacar el valor
        let newDigit = 0;
        let result = 0;
        result = element * 2;
        if (result >= 10) { //si el resultado de la multiplicación es mayor o igual a 10 sumamos sus dígitos
          result = result.toString(); //para separarlos lo transformamos a string
          newDigit = parseInt(result[0]) + parseInt(result[1]); //Sumamos cada digito regresamos a número
          return newDigit;
        } else {
          newDigit = result //en caso de que el resultado sea menor o igual a 10 tambien entran en result
          return newDigit;
        }
      } else {
        return parseInt(element);
      }
    })
    let sum = digits.reduce((prev, cur) => prev + cur, 0);
    if (sum % 10 === 0) {
      return true;
    }
    return false;
  }
  return false
};
// Validadcion del Nombre

const validateName = name => {
  if (/\d/.test(name)) { // verificar si el string tiene números
    return false;
  } else {
    const nameArray = name.split(' ');
    console.log(nameArray);
    if (nameArray[0]==='' || nameArray.length < 2) { //verificar si el string tiene espacios al principio o tiene menos de dos palabras
      return false
    }
    return true;
  }
};

//validación de todos los datos ingresados
const validateCardDetails = form => {
  const datos = Array.from(form);
  console.log(datos);
  const cvv = datos[2].value;
  const name = datos[3].value;
  const tdc = datos[0].value;
  if (validateIfIsNumber(cvv) && validateNumCard(tdc) && validateName(name)) {
    return true
  }
  return false
}

//Detonando el evento que activa la validación 

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateCardDetails(form)) {
    console.log('datos válido... enviar...');
  } else {
    console.log('datos inválidos');
  }
});