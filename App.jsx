import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/Navigator';
import { Lab6ContextProvider } from './src/lab6/Lab6Context';
import { Lab7ContextProvider } from './src/lab7/Lab7Context';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#f7022a',
        accent: '#B3DEC1',
        green: '#3eb489',
        blue: '#45b6fe',
        black: '#ffffff'
    },
};

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <Lab6ContextProvider>
                <Lab7ContextProvider>
                    <Navigator />
                </Lab7ContextProvider>
            </Lab6ContextProvider>
        </PaperProvider>
    );
};

export default App;
