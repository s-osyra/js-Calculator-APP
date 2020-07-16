import { Component, HostListener } from '@angular/core';
import { calculate } from '../../services/calculate';
import { buttonList }  from '../../helpers/button-list';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',

})

export class CalculatorComponent {
  
  buttonList = buttonList;
  currentMathematicOperator: string = '';
  equation: string = '';
  currentInputValue: string = '0';
  
  lastInputValue: string = '';

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
    this.calculator(value);
  }

  calculatorButtonClick(button: any) {
    let value: string = button.target.attributes.value.nodeValue;
    this.calculator(value);
  }

  clean() {
    this.currentInputValue = '0';
    this.currentMathematicOperator = '';
    this.lastInputValue = '';
    this.equation = '';
    this.endResultFlag = false;
  }

  calculator(value: string) {
    if (this.clear) {
      this.clean();
      this.clear = false;
    }

    const allowedNumberSymbols: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%'];
    const allowedMathematicOperators: string[] = ['+', '-', '/', 'x']
    const specialSymbols: string[] = ['C', '+/-', '=']
    

    if (this.lastInputValue === '' && value === '=') {
      return;
    };
    if (!this.lastInputValue.includes('x') && value === '%') {
      return;
    }

    if (allowedMathematicOperators.includes(value) || value === '=') {
      this.equation = this.equation.concat(this.currentInputValue + ' ');
      this.equation = this.equation.concat(value + ' ');
    };

    switch (value) {
      case "=": {
        this.endResultFlag = true;
        this.currentInputValue = calculate(this.equation);
        this.clear = true;
        break;
      }
      case 'C': {
        this.clean();
        break;
      }
      case '+/-': {
        if (this.currentInputValue === '0' || this.endResultFlag === true) {
          break;
        }
        !this.currentInputValue.includes('-') ? this.currentInputValue = '-'.concat(this.currentInputValue) : this.currentInputValue = this.currentInputValue.substr(1);
        break;
      }
      case '%': {
        if (this.currentInputValue.includes('%')) {
          return;
        }
        break;
      }
    };
    
    if (allowedMathematicOperators.includes(value)) {
      this.lastInputValue = value;
      this.currentInputValue = '0';
    }

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
}
