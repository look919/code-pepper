import React, { FC } from 'react';
import { Button as MUIButton } from '@material-ui/core';

export const Button: FC = ({ children }) => {
  return (
    <MUIButton variant='contained' color='primary'>
      {children}
    </MUIButton>
  );
};
