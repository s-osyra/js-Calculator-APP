"use strict";
exports.__esModule = true;
exports.calculate = void 0;
exports.calculate = function (singleEquation) {
    var result;
    var equation = singleEquation.split(' ');
    equation = equation.filter(function (x) { return x !== ' ' && x !== '='; });
    if (equation.join().includes('%')) {
        while (equation.includes('%')) {
            console.log('true');
            var percentageIndex = equation.indexOf('%');
            equation[percentageIndex] = (parseFloat(equation[percentageIndex]) / 100).toString();
        }
    }
    while (equation.length > 1) {
        var operationIndex = void 0;
        if (equation.includes('x') || equation.includes('/')) {
            operationIndex = equation.includes('x') ? equation.indexOf('x') : equation.indexOf('/');
        }
        else {
            operationIndex = equation.includes('+') ? equation.indexOf('+') : equation.indexOf('-');
        }
        var v1 = parseFloat(equation[operationIndex - 1]);
        var v2 = parseFloat(equation[operationIndex + 1]);
        equation[operationIndex + 1].includes('%') ? v2 /= 100 : v2 = v2;
        var result_1 = void 0;
        if (equation[operationIndex] === '/' && v2 === 0) {
            return 'Error';
        }
        if (equation.includes('x') || equation.includes('/')) {
            equation[operationIndex] === 'x' ? result_1 = v1 * v2 : result_1 = v1 / v2;
        }
        else {
            equation[operationIndex] === '+' ? result_1 = v1 + v2 : result_1 = v1 - v2;
        }
        equation[operationIndex] = result_1.toString();
        equation[operationIndex - 1] = undefined;
        equation[operationIndex + 1] = undefined;
        equation = equation.filter(function (x) { return x !== undefined; });
    }
    return equation.join();
};
var a = '1 + 2 x 5 =';
console.log(exports.calculate(a));
