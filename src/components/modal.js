import ReactDOM from 'react-dom'
import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Button } from "./styled_tags";

const modalRoot = document.getElementById('modal-root');

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .5);
`;

const Container = styled.div`
  width: 180;
  border-radius: 10px;
  padding: 12px 18px;
  color: #F652A0;
  background-color: #FFFFFF;
  border: 2px solid #4C5270;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
`;

const Modal = (props) => {
  return ReactDOM.createPortal(
    <ModalContainer onClick={props.cancel}>
      {props.children}
    </ModalContainer>,
    modalRoot
  )
}

export const ModalResetConfirm = ({ confirm, cancel }) => {
  return (
    <Modal cancel={cancel}>
      <Container onClick={(e) => e.stopPropagation()}>
        <div style={{ fontWeight: "bold" }}>本当にリセットしますか？</div>
        <ButtonWrapper>
          <Button onClick={confirm}>OK</Button>
          <Button onClick={cancel}>キャンセル</Button>
        </ButtonWrapper>
      </Container>
    </Modal >
  )
}