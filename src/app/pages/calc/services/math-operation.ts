function calculate(firstValue: string, secoundValue: string, mathematicOperator: string) {

    let v1 = parseFloat(firstValue);
    let v2 = parseFloat(secoundValue);
    let result: any = 0;

    if (firstValue.includes('%')) {
        v1 = v1 / 100;
    }

    switch (mathematicOperator) {
        case '+': {
            result = v2 + v1;
            break;
        }
        case '-': {
            result = v2 - v1;
            break;
        }
        case '/': {
            if (v1 === 0) {  // można  !numerOne ? : v2 / number one : 'Error'; 
                result = 'Error';
                break;
            }
            result = v2 / v1;
            break;
        }
        case 'x': {
            result = v2 * v1;
            break;
        }


    }

    return result.toString();



};


export {
    calculate,
}