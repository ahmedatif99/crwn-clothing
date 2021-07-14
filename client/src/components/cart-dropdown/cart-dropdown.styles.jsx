import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 255px;
  height: 355px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  overflow: hidden;
`;

export const CartDropdownButton = styled(CustomButton)`
    margin-top: auto;
    font-weight: normal
`;

export const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItemsContainer = styled.div`
  height: 255px;
  width: 100%;
  padding-right: 17px;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;