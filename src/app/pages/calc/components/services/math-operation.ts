function calculate(inputNumbrOne: string, inputNumbrTwo: string, mathOperaor: string) {

    let numberOne = parseFloat(inputNumbrOne);
    let numberTwo = parseFloat(inputNumbrTwo);
    let result: any = 0;

    if (inputNumbrOne.includes('%')) {
        numberOne = numberOne / 100;
    }

    switch (mathOperaor) {
        case '+': {
            result = numberTwo + numberOne;
            break;
        }
        case '-': {
            result = numberTwo - numberOne;
            break;
        }
        case '/': {
            if (numberOne === 0) {  // można  !numerOne ? : numberTwo / number one : 'Error'; 
                result = 'Error';
                break;
            }
            result = numberTwo / numberOne;
            break;
        }
        case 'x': {
            result = numberTwo * numberOne;
            break;
        }


    }

    return result.toString();



};


export {
    calculate,
}