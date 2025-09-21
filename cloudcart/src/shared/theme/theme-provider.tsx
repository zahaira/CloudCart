'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import  theme  from './theme';

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
