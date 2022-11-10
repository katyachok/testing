import { StyledInput, StyledLabel } from './styled';

export const Input = ({
  labelText,
  errorMessage,
  ...props
}) => (
    <StyledLabel>
    <p>
      {labelText}
      <span>*</span>
    </p>
    <StyledInput
      size='large'
      status={errorMessage && 'error'}
      maxLength={255}
      {...props}
    />
  </StyledLabel>
);
