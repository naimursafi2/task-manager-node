import React from 'react';
import styled from 'styled-components';

const ToggoleSwitch = () => {
  return (
    <StyledWrapper>
      <div>
        <input id="checkboxInput" type="checkbox" />
        <label className="toggleSwitch" htmlFor="checkboxInput">
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* To hide the checkbox */
  #checkboxInput {
    display: none;
  }

  .toggleSwitch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 80px;
    height: 40px;
    background-color: rgb(199, 199, 199);
    border-radius: 20px;
    cursor: pointer;
    transition-duration: .3s;
  }

  .toggleSwitch::after {
    content: "";
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0px;
    background: conic-gradient(rgb(104, 104, 104),white,rgb(104, 104, 104),white,rgb(104, 104, 104));
    border-radius: 50%;
    transition-duration: .3s;
    box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.308);
  }

  #checkboxInput:checked+.toggleSwitch::after {
    transform: translateX(100%);
    transition-duration: .3s;
  }
  /* Switch background change */
  #checkboxInput:checked+.toggleSwitch {
    background-color: rgb(153, 197, 151);
    transition-duration: .3s;
  }`;

export default ToggoleSwitch;
