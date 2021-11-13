import React from 'react';
import axios from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface AppContextProps {
  initialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;

  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;

  showLoading: (value: boolean) => void;
  showNotification: (title: string, body: string) => void;
  fetchApi: (method: HttpMethod, url: string, data?: any) => Promise<any>;
}

export const AppContext = React.createContext<AppContextProps>(undefined!);

export interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [uid, setUid] = React.useState<string>('');

  const showNotification = (title: string, body: string) => {
    // notification.error({
    //   message: title,
    //   description: body,
    //   duration: 1,
    // });
  };

  const fetchApi = async (method: HttpMethod, url: string, data?: any) => {
    let responseData: any = null;

    try {
      const response = await axios({
        method,
        url,
        data,
      });

      responseData = response.data;
    } catch (error: any) {
      showNotification('Error', error.message);
    }

    return responseData;
  };

  return (
    <AppContext.Provider
      value={{
        initialized,
        setInitialized,

        uid,
        setUid,

        showLoading: () => {},
        showNotification,
        fetchApi,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
