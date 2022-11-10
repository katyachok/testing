import { StyledButton } from './styled';

export const Button = ({ children, loading, ...props }) => (
  <StyledButton type='primary' size='middle' loading={loading} {...props}>
    {!loading && children}
  </StyledButton>
);
