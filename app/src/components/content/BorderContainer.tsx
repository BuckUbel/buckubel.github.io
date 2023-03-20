import React from 'react';
import styled from 'styled-components';
import { StateType, StyledCompProps } from '../helper/types';
import { Color } from '../config/color';
import TextButton from '../data/projects/gifMaker/TextButton';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';

interface BorderContainerProps extends StyledCompProps {
  extraClassName?: string;
  collapsedState?: StateType<boolean>;
}

function BorderContainer({
                           className,
                           extraClassName = '',
                           children,
                           collapsedState
                         }: BorderContainerProps) {

  const [collapsed, setCollapsed] = collapsedState ?? [false, () => {
  }];
  if (collapsed) {
    extraClassName = extraClassName + ' collapsed';
    className = className + ' collapsed';
  }
  const withCollapsedState = !!collapsedState;

  return <div className={className + " border-container-outer"}>
    {withCollapsedState && <>
      <TextButton className={'toggle-button' + (collapsed ? ' collapsed' : '')} background={Color.ALPHA_COLOR}
                  icons={[faArrowUp]}
                  onClick={() => {
                    setCollapsed(v => !v);
                  }} />
    </>}
    <div className={'border-container ' + extraClassName}>

      {children}
    </div>
    {withCollapsedState && collapsed && <>
      <div className={'hide-container'} />
      <TextButton className={'toggle-button collapsed-toggle-button'} background={Color.ALPHA_COLOR}
                  icons={[faArrowDown]}
                  onClick={() => {
                    setCollapsed(v => !v);
                  }} />
    </>}
  </div>;
}

export default styled(BorderContainer)`
  position: relative;
  border: 1px solid ${Color.TEXT_PRIME_COLOR};
  box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
  background: ${Color.PRIME_COLOR};
  color: ${Color.TEXT_PRIME_COLOR};

  width: calc(50% - 12px);
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  padding: 10px 5px;

  &.collapsed {
    height: 30px;
    overflow: hidden;
  }

  .border-container {
    min-height: 150px;
    max-height: 450px;

    &.collapsed {
      min-height: unset;
      max-height: 30px;
      overflow: hidden;
      filter: blur(4px) brightness(0.5);
    }

    transition: max-height .5s, filter .5s;
  }

  .hide-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .toggle-button {
    opacity: 50%;
    width: calc(100% - 10px);
    height: 30px;
    //transition: opacity .5s, padding .5s;

    &.collapsed {
      height: 0;
      padding: 0;
      opacity: 0;
      margin: 0;
    }

    &.collapsed-toggle-button {
      position: absolute;
      top: 5px;
      left: 0;
      width: calc(100% - 10px);
      //height: calc(100% - 12px);
    }

    &:hover {
      opacity: 100%;
      transition: opacity 0.5s;
    }
  }
`;
