export const calculate = function ( singleEquation: string) : string {
        let result: number;
        let equation: string [] = singleEquation.split(' ');

        equation = equation.filter( x => x !== ' ' && x !== '=' && x !=="");


        if (equation.join().includes('%')) {
            while (equation.includes('%')) {
                console.log('true');
                let percentageIndex: number = equation.indexOf('%');
                equation[percentageIndex] = (parseFloat(equation[percentageIndex])/100).toString()
            }
        }

        while (equation.length > 1)
        {            
            let operationIndex: number;
            
            if (equation.includes('x') || equation.includes('/'))
            {
                operationIndex = equation.includes('x') ? equation.indexOf('x') : equation.indexOf('/');
            } else {
                operationIndex = equation.includes('+') ? equation.indexOf('+') : equation.indexOf('-'); 
            }
            
            let v1: number = parseFloat(equation [operationIndex - 1]);
            let v2: number = parseFloat(equation [operationIndex + 1]);

            equation[operationIndex + 1].includes('%') ? v2 /= 100 : v2 = v2; 
            
            let result: number;

            if (equation[operationIndex] === '/' && v2 === 0){
                return 'Error';
            }

            if (equation.includes('x') || equation.includes('/'))
            {
                equation[operationIndex] === 'x' ? result = v1 * v2 : result = v1 / v2;
            } else {
                equation[operationIndex] === '+' ? result = v1 + v2 : result = v1 - v2; 
            }    

            equation [operationIndex] = result.toString();
            equation [operationIndex - 1] = undefined;
            equation [operationIndex + 1] = undefined;
            equation = equation.filter( x => x !== undefined )
        }
        console.log(equation.join())
        return equation.join();
    }

    // const a: string = '1 + 2 x 5 =';
    // console.log(calculate(a));