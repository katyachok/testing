import { Input as AntdInput } from 'antd';
import styled from 'styled-components';

import { COLORS } from '../../constants/colorPalette';

export const StyledInput = styled(AntdInput)({
  fontFamily: 'Poppins, sans-serif',
  '&::placeholder': {
    color: COLORS.gray900,
  },
});

export const StyledLabel = styled('label')({
  display: 'block',
  color: COLORS.gray700,
  textAlign: 'left',
  fontFamily: 'Poppins, sans-serif',
  letterSpacing: '-0.02em',
  '& p': {
    minHeight: '20px',
    marginBottom: '4px',
    '& span': {
      color: COLORS.red500,
    },
  },
});
