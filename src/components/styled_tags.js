import styled from "styled-components";

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
