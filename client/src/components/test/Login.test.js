import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/UserSlice';

// Mock store setup
const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            users: userReducer,
        },
        preloadedState: initialState,
    });
};

describe('Login Component', () => {
    test('renders login form elements', () => {
        const store = createMockStore({
            users: { user: null, isError: false, isSuccess: false, message: '' }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByPlaceholderText(/Enter your Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    test('shows error message on login failure', () => {
        const store = createMockStore({
            users: { user: null, isError: true, isSuccess: false, message: 'Invalid Credentials..' }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Username or Password is incorrect/i)).toBeInTheDocument();
    });

    test('updates input fields', () => {
        const store = createMockStore({
            users: { user: null, isError: false, isSuccess: false, message: '' }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText(/Enter your Email/i);
        const passwordInput = screen.getByPlaceholderText(/Enter your Password/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });
});
