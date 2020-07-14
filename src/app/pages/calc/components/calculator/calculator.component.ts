import { Component, HostListener } from '@angular/core';
import { calculate } from '../../services/math-operation';
import { buttonList }  from '../../helpers/button-list';




@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',

})


export class CalculatorComponent {
  
  buttonList = buttonList;

  currentInputValue: string = '0';
  currentMathematicOperator: string = '';
  lastInputValue: string = '';
  topDisplayValue: string = '';
  endResultFlag: boolean = false;
  clear: boolean = false;

  @HostListener("window:keydown", ['$event'])

  calculatorKeyDown(event: KeyboardEvent) {

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

  calculatorButtonClick(button: any) {

    let value: string = button.target.attributes.value.nodeValue;
    this.calculate(value);

  }

  clean() {
    this.currentInputValue = '0';
    this.currentMathematicOperator = '';
    this.lastInputValue = '';
    this.topDisplayValue = '';
    this.endResultFlag = false;
  }

  calculate(value: string) {


    if (this.clear) {
      this.clean();
      this.clear = false;
    }

    const allowedNumberSymbols: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%'];
    const allowedMathematicOperators: string[] = ['+', '-', '/', 'x']
    const specialSymbols: string[] = ['C', '+/-', '=']

    if (this.lastInputValue === '' && value === '=') {
      return;
    }
    if (this.currentMathematicOperator !== 'x' && value === '%') {
      return;
    }

    if (this.lastInputValue === '0' && this.currentMathematicOperator === '/') {
      this.currentInputValue = 'Error!';
      this.clear = true;
      return;
    }


    if (allowedMathematicOperators.includes(value) || value === '=') {

      this.topDisplayValue = this.topDisplayValue.concat(this.currentInputValue + ' ');
      this.topDisplayValue = this.topDisplayValue.concat(value + ' ');

    }

    if (!this.endResultFlag) {
      if (this.currentInputValue === '0' && allowedNumberSymbols.includes(value)) {
        if (value === '.') {
          this.currentInputValue = this.currentInputValue.concat(value);
          return;
        }

        this.currentInputValue = value;
        return;
      }

      if (this.currentInputValue !== '0' && allowedNumberSymbols.includes(value)) {

        if (this.currentInputValue.includes('.') && value === '.') {
          return;
        }
        this.currentInputValue = this.currentInputValue.concat(value);

        return;
      }
    }


    if (allowedMathematicOperators.includes(value) || value === '=') {



      if (this.lastInputValue !== '' && value === '=') {
        this.currentInputValue = calculate(this.currentInputValue, this.lastInputValue, this.currentMathematicOperator);
        this.currentMathematicOperator = '';
        this.lastInputValue === ''
        this.endResultFlag = true
        this.clear = true;
        return;
      }

      if (this.currentMathematicOperator === '') {
        this.currentMathematicOperator = value;
        this.lastInputValue = this.currentInputValue;
        this.currentInputValue = '0';
        this.endResultFlag = false
        return;
      }

      if (this.currentMathematicOperator !== '' && this.lastInputValue !== '') {
        this.lastInputValue = calculate(this.currentInputValue, this.lastInputValue, this.currentMathematicOperator);
        this.currentMathematicOperator = value;
        this.currentInputValue = '0';
      }
    }


    switch (value) {
      case "C": {
        this.clean();
        break;
      }
      case "+/-": {
        if (this.currentInputValue === '0' || this.endResultFlag === true) {
          break;
        }

        if (!this.currentInputValue.includes('-')) {
          this.currentInputValue = '-'.concat(this.currentInputValue)
        } else {
          this.currentInputValue = this.currentInputValue.substr(1);
        }
        break;
      }
    }

  }

}
