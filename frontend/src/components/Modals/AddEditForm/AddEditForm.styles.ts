import styled from "styled-components";

interface StyleProps {
  width?: number;
}

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const AddEditModal = styled.div`
  width: 90%;
  height: 700px;
  border-radius: 10px;
  background: #fff;
  margin: 5% auto;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  border-bottom: 0.5px solid rgba(34, 36, 38, 0.15);
  padding: 0px 10px;
`;

export const ModalBody = styled.div`
  height: 80%;
  overflow: auto;
  padding: 20px;
  background-color: rgb(240, 240, 240);
`;

export const ModalFooter = styled.div`
  border-top: 0.5px solid rgba(34, 36, 38, 0.15);
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`;

export const FormWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const LeftBody = styled.div`
  width: 75%;
  margin-right: 10px;
`;

export const RightBody = styled.div`
  margin-left: 10px;
  width: 25%;
  margin-top: 10px;
`;

export const GroupFields = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px;

  & > div {
    margin: 5px;
    align-self: flex-end;
  }
`;

export const Field = styled.div`
  flex-grow: ${(props: StyleProps) => props.width};
`;
