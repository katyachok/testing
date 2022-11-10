import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

import { COLORS } from '../../constants/colorPalette';

export const StyledButton = styled(AntdButton)({
  maxWidth: '262px',
  fontFamily: 'Poppins, sans-serif',
  letterSpacing: '-0.02em',
  '&.ant-btn-primary:hover.ant-btn:not([disabled]):hover': {
    background: COLORS.blue600,
    border: `1px solid ${COLORS.blue600}`,
  },
  '&.ant-btn-default:hover': {
    borderColor: COLORS.blue600,
    color: COLORS.blue600,
  },
});
