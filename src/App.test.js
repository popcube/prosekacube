import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";

test('renders learn react link', () => {
  render(<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>);
  const linkElement = screen.getByText("プロセカキューブ");
  expect(linkElement).toBeInTheDocument();
});
