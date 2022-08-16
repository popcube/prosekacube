import styled, { keyframes} from "styled-components";

export const TitleText = styled.a`
  font-size: 150%;
  color: #f652a0;
`;

export const TextDiv = styled.div`
  padding: 5px 0px;
  align: center;
  display: flex;
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
  align: left;
  border: 1px solid #f652a0;
  border-radius: 10px;
  padding-left: 10px;
`;

export const ImgContainer = ({ src, title, alt, latest }) => {
  return (
    <ImgDiv style={latest ? {} : { border: "1px solid #4C5270" }}>
      <div align="left">
        <TitleText style={latest ? {} : { color: "#4C5270" }}>{title}</TitleText>
      </div>
      <div align="left">
        <img src={src} alt={alt} />
      </div>
    </ImgDiv>
  );
};
