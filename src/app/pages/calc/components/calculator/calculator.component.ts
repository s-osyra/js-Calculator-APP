import { Component, HostListener } from '@angular/core';
import { calculatorButton } from '../models/buttonInterface';
import { calculate } from '../services/math-operation';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']

})

export class CalculatorComponent {
  
  buttons: calculatorButton[] = [
    { value: '%', columnStyle: 'dark-grey' },
    { value: '+/-', columnStyle: 'light-grey' },
    { value: 'C', columnStyle: 'white' },
    { value: '/', columnStyle: 'purple' },
    { value: '7', columnStyle: 'dark-grey' },
    { value: '8', columnStyle: 'light-grey' },
    { value: '9', columnStyle: 'white' },
    { value: 'x', columnStyle: 'purple' },
    { value: '4', columnStyle: 'dark-grey' },
    { value: '5', columnStyle: 'light-grey' },
    { value: '6', columnStyle: 'white' },
    { value: '-', columnStyle: 'purple' },
    { value: '1', columnStyle: 'dark-grey' },
    { value: '2', columnStyle: 'light-grey' },
    { value: '3', columnStyle: 'white' },
    { value: '+', columnStyle: 'purple' },
    { value: '0', columnStyle: 'dark-grey' },
    { value: '.', columnStyle: 'light-grey' },
    { value: '=', columnStyle: 'pink' },
  ]


  firstInput: string = '0';
  mathematicOperator: string = 'null';
  secoundInput: string = 'null';
  topDisplayValue: string = '';
  resultFlag: boolean = false;
  clear: boolean = false;

  @HostListener("window:keydown", ['$event'])

  onKeyDown(event: KeyboardEvent) {

    let value: string;

    switch (event.key) {
      case 'Enter': {
        value = '=';
        break;
      }
      case '*': {
        value = 'x';
        break;
      }
      case ',': {
        value = '.';
        break;
      }
      default: {
        value = event.key;
        break;
      }
    }

    this.calculate(value);

  }

  onClick(button: any) {

    let value: string = button.target.attributes.value.nodeValue;
    this.calculate(value);

  }

  clean() {
    this.firstInput = '0';
    this.mathematicOperator = 'null';
    this.secoundInput = 'null';
    this.topDisplayValue = '';
    this.resultFlag = false;
  }

  calculate(value: string) {


    if (this.clear) {
      this.clean();
      this.clear = false;
    }

    const numberSymbols: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%'];
    const mathematicOperatorSymbols: string[] = ['+', '-', '/', 'x']
    const specialSymbols: string[] = ['C', '+/-', '=']

    if (this.secoundInput === 'null' && value === '=') {
      return;
    }
    if (this.mathematicOperator !== 'x' && value === '%') {
      return;
    }

    if (this.secoundInput === '0' && this.mathematicOperator === '/') {
      this.firstInput = 'Error!';
      this.clear = true;
      return;
    }


    if (mathematicOperatorSymbols.includes(value) || value === '=') {

      this.topDisplayValue = this.topDisplayValue.concat(this.firstInput + ' ');
      this.topDisplayValue = this.topDisplayValue.concat(value + ' ');

    }

    if (this.resultFlag === false) {
      if (this.firstInput === '0' && numberSymbols.includes(value)) {
        if (value === '.') {
          this.firstInput = this.firstInput.concat(value);
          return;
        }

        this.firstInput = value;
        return;
      }

      if (this.firstInput !== '0' && numberSymbols.includes(value)) {

        if (this.firstInput.includes('.') && value === '.') {
          return;
        }
        this.firstInput = this.firstInput.concat(value);

        return;
      }
    }


    if (mathematicOperatorSymbols.includes(value) || value === '=') {



      if (this.secoundInput !== 'null' && value === '=') {
        this.firstInput = calculate(this.firstInput, this.secoundInput, this.mathematicOperator);
        this.mathematicOperator = 'null';
        this.secoundInput === 'null'
        this.resultFlag = true
        this.clear = true;
        return;
      }

      if (this.mathematicOperator === 'null') {
        this.mathematicOperator = value;
        this.secoundInput = this.firstInput;
        this.firstInput = '0';
        this.resultFlag = false
        return;
      }

      if (this.mathematicOperator !== 'null' && this.secoundInput !== 'null') {
        this.secoundInput = calculate(this.firstInput, this.secoundInput, this.mathematicOperator);
        this.mathematicOperator = value;
        this.firstInput = '0';
      }
    }


    switch (value) {
      case "C": {
        this.clean();
        break;
      }
      case "+/-": {
        if (this.firstInput === '0' || this.resultFlag === true) {
          break;
        }

        if (!this.firstInput.includes('-')) {
          this.firstInput = '-'.concat(this.firstInput)
        } else {
          this.firstInput = this.firstInput.substr(1);
        }
        break;
      }
    }

  }

}
