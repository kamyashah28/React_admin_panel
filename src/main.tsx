import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  </Provider>
);
