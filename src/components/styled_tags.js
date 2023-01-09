import styled, { keyframes } from "styled-components";

export const TitleDiV = styled.div`
  font-size: 150%;
  color: #f652a0;
  white-space: nowrap;
`;

export const TextDiv = styled.div`
  padding: 5px 0px;
  align: center;
  display: flex;
  white-space: nowrap;
`;

export const CalcSpan = styled.span`
  display: inline-block;
  font-weight: bold;
  color: #4c5270;
  margin: 0px 5px;
`;

export const BodyDiv = styled.div`
  background-color: #bcece0;
`;

export const ImgDiv = styled.div`
  padding: 12px 64px 12px;
  border: 1px solid #f652a0;
  border-radius: 10px;
  margin-top: 10px;
`;

export const Input = styled.input`
  border-width: 1px;
  border-color: #4C5270;
  border-style: none none solid;
  padding: 0px 8px;
  width: 50px;
  margin: 0px 5px;
`;

export const Select = styled.select`
  border-width: 1px;
  border-color: #4C5270;
  border-style: none none solid;
  padding: 0px 8px;
  width: 60px;
  margin: 0px 5px;
`;

export const Button = styled.button`
  border-radius: 11px;
  border: 2px solid #36EEE0;
  padding: 0px 8px;
  color: black;
  background-color: #bcece0;
  margin: 0px 5px;
  height: 22px;
`;

const toFadeOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ActionText = styled.span`
  color: #f652a0;
  opacity: 0;
  animation: ${props => props.toDisplay ? toFadeOut : "none"} 2s;
`;

export const InputDiv = styled.div`
  position: relative;
  align: left;
  border: 1px solid #f652a0;
  border-radius: 10px;
  padding-left: 10px;
  background-color: white;
  opacity: 1;
  z-index: 2;
`;

export const InputDiv2 = styled.div`
  position: relative;
  align: left;
  border: 1px solid #f652a0;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  opacity: 0;
  transform: translateY(-100%);
  transition-property: transform opacity;
  transition-duration: 1s;
  z-index: 1;
`;

export const ImgContainer = ({ src, title, alt, latest }) => {
  return (
    <ImgDiv style={latest ? {} : { border: "1px solid #4C5270" }}>
      <div>
        <TitleDiV style={latest ? {} : { color: "#4C5270" }}>{title}</TitleDiV>
      </div>
      <div>
        <img src={src} alt={alt} />
      </div>
    </ImgDiv>
  );
};
