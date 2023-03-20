import * as React from 'react';
import styled from 'styled-components';
import { StateType } from '../helper/types';
import { Color } from '../config/color';
import { TEXTCOLOR } from '../config/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

interface SelectionFieldProps<T> {
  className?: string;
  state: StateType<T>;
  label?: string;
  options: readonly T[];
  optionLabelChanger?: (option: T) => JSX.Element | string;
}

function SelectionField<T extends string | number | boolean>({
                                                               className,
                                                               state,
                                                               options,
                                                               label,
                                                               optionLabelChanger = (option) => {
                                                                 if (option === true) return <FontAwesomeIcon
                                                                   icon={faCheck} />;
                                                                 if (option === false) return <FontAwesomeIcon
                                                                   icon={faTimes} />;
                                                                 return String(option);
                                                               }
                                                             }: SelectionFieldProps<T>) {
  const [value, setValue] = state;
  return (
    <div className={`${className} input-container`}>
      <span className={'input-label'}>{label + ': '}</span>
      <div className={'input-value-container'}>

        {options.map((option, index) => {
          return <span
            key={option + '-' + index}
            className={(option === value ? 'selected' : '') + ' input-value'}
            onClick={() => setValue(option)}>
          {optionLabelChanger(option)}
        </span>;

        })}
      </div>
    </div>
  );
}

export default styled(SelectionField)`
  position: relative;
  width: calc(100% - 10px);
  //height: 30px;
  padding: 5px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  .input-label {
    display: inline-block;
    vertical-align: middle;
    padding: 4px 0;
    margin-right: 4px;
    width: calc(30% - 6px);
  }

  .input-value-container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: row;

    vertical-align: middle;
    width: calc(70% - 12px);
    padding: 6px;
    margin: 1px;


    .input-value {

      height: 16px;
      padding: 6px;
      margin-bottom: 3px;

      cursor: pointer;

      font-size: 14px;
      ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};

      background: ${Color.PRIME_COLOR};
      border: 1px solid ${Color.TEXT_PRIME_COLOR};
      box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};

      transition: color 1s, background 1s;

      &:hover {
        background: ${Color.BETA_COLOR};
        ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
      }

      &.selected {
        background: ${Color.TEXT_PRIME_COLOR};
        ${TEXTCOLOR(Color.BETA_COLOR)};
      }
    }
  }

` as typeof SelectionField;
