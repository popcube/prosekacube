import styled from "styled-components";

export const TitleText = styled.a`
  font-weight: bold;
  font-size: 150%;
  background-color: #bcece0;
`;

export const TextDiv = styled.div`
  padding: 5px 0px;
  align: center;
`;

export const ALink = ({ children }) => {
  return <a href={children}>{children}</a>;
};

export const BodyDiv = styled.div`
  background-color: #bcece0;
`;

export const TitleDiv = ({ children }) => {
  return (
    <div>
      <TitleText>{children}</TitleText>
    </div>
  );
};

export const ImgDiv = styled.div`
  padding: 12px 64px 12px;
  background-color: #bcece0;
`;

export const ImgContainer = ({ src, title, alt, latest }) => {
  return (
    <ImgDiv style={latest ? { backgroundColor: "#F652A0" } : {}}>
      <div align="left">
        <TitleDiv>{title}</TitleDiv>
      </div>
      <div align="left">
        <img src={src} alt={alt} />
      </div>
    </ImgDiv>
  );
};
