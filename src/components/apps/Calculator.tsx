'use client';

import { useState } from 'react';
import { Delete } from 'lucide-react';

interface CalculatorProps {
  windowId: string;
}

export function Calculator({ windowId }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue;
      let result = 0;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = currentValue / inputValue;
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        result = previousValue / inputValue;
        break;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const Button = ({
    children,
    onClick,
    variant = 'default',
    span = 1,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'operator' | 'equals' | 'function';
    span?: number;
  }) => (
    <button
      onClick={onClick}
      className={`
        h-14 rounded-lg font-medium text-xl transition-colors
        ${span === 2 ? 'col-span-2' : ''}
        ${
          variant === 'default'
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : variant === 'operator'
            ? 'bg-[#3B82F6] hover:bg-[#FF6B35] text-white'
            : variant === 'equals'
            ? 'bg-[#3B82F6] hover:bg-[#FF6B35] text-white'
            : 'bg-white/5 hover:bg-white/10 text-white/80'
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white p-4">
      {/* Display */}
      <div className="bg-[#2D2D2D] rounded-lg p-4 mb-4">
        <div className="text-right text-sm text-white/50 h-6">
          {previousValue !== null && `${previousValue} ${operation}`}
        </div>
        <div className="text-right text-4xl font-light overflow-hidden">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <Button onClick={clear} variant="function">
          C
        </Button>
        <Button onClick={toggleSign} variant="function">
          ±
        </Button>
        <Button onClick={inputPercent} variant="function">
          %
        </Button>
        <Button onClick={() => performOperation('÷')} variant="operator">
          ÷
        </Button>

        <Button onClick={() => inputDigit('7')}>7</Button>
        <Button onClick={() => inputDigit('8')}>8</Button>
        <Button onClick={() => inputDigit('9')}>9</Button>
        <Button onClick={() => performOperation('×')} variant="operator">
          ×
        </Button>

        <Button onClick={() => inputDigit('4')}>4</Button>
        <Button onClick={() => inputDigit('5')}>5</Button>
        <Button onClick={() => inputDigit('6')}>6</Button>
        <Button onClick={() => performOperation('-')} variant="operator">
          −
        </Button>

        <Button onClick={() => inputDigit('1')}>1</Button>
        <Button onClick={() => inputDigit('2')}>2</Button>
        <Button onClick={() => inputDigit('3')}>3</Button>
        <Button onClick={() => performOperation('+')} variant="operator">
          +
        </Button>

        <Button onClick={() => inputDigit('0')} span={2}>
          0
        </Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button onClick={calculate} variant="equals">
          =
        </Button>
      </div>
    </div>
  );
}
