/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import {
  useTemplateVal,
} from '@dsplay/react-template-utils';

export const ThemeContext = createContext({
  globalTheme: {
    primaryColor: '',
    secondaryColor: '',
    lineColor: '',
  },
});

const ThemeContextParent = (props) => {
  let primaryColor = useTemplateVal('primaryColor', '');
  let secondaryColor = useTemplateVal('secondaryColor', '');
  let lineColor = useTemplateVal('lineColor', '');

  if (!primaryColor) {
    primaryColor = '#008c9e';
  }

  if (!secondaryColor) {
    secondaryColor = '#005f6b';
  }

  if (!lineColor) {
    lineColor = '#cecece';
  }

  // const theme = activeTheme;
  const { children } = props;

  const value = {
    globalTheme: {
      primaryColor,
      secondaryColor,
      lineColor,
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextParent;
