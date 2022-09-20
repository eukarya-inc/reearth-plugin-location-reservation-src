import { styled } from "@web/theme";

type CardProps = {
  padding?: string;
  children?: React.ReactNode;
  flex?: string;
};

const Card: React.FC<CardProps> = ({ padding, children, flex }: CardProps) => {
  return (
    <Wrapper padding={padding} flex={flex}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: ${(props: any) => props.flex ?? "none"};
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: ${(props: any) => props.padding ?? "12px"};
`;

export default Card;
