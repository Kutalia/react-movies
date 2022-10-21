import { useState, createContext, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { v4 as uuidv4 } from 'uuid';

import { AUTO_HIDE_DURATION } from './constants';
import Alert from './Alert';

interface AlertType {
  id: string;
  text: string;
}

interface AlertContextType {
  alerts: Array<AlertType>;
  setAlert: (text: string) => void;
}

export const AlertContext = createContext<AlertContextType>({
  alerts: [],
  setAlert: () => {},
});

interface PropTypes {
  children: React.ReactNode;
}

export const AlertsProvider: React.FC<PropTypes> = ({ children }) => {
  const [alerts, setAlerts] = useState<Array<AlertType>>([]);

  const handleAlertClose = useCallback((alertId: string) => {
    setAlerts((prevState) => prevState.filter(({ id }) => alertId !== id));
  }, []);

  const setAlert = useCallback((text: string) => {
    const id = uuidv4();

    setAlerts((prevState) => [
      ...prevState,
      {
        id,
        text,
      },
    ]);
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, setAlert }}>
      {alerts.map(({ id, text }, index) => (
        <Snackbar
          key={id}
          open={!!alert}
          autoHideDuration={AUTO_HIDE_DURATION}
          onClose={() => handleAlertClose(id)}
          sx={{ bottom: `${4 * index}rem !important` }}
        >
          <Alert
            onClose={() => handleAlertClose(id)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      ))}
      {children}
    </AlertContext.Provider>
  );
};
