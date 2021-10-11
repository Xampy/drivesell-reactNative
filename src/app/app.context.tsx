import React from 'react';
import AppContainer from './share/container/app.container';

export interface AppContextInterface {
   appContainer: AppContainer
}

const AppContext = React.createContext<Partial<AppContextInterface>>({});
export default  AppContext;