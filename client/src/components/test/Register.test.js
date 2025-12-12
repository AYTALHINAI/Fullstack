import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';
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

describe('Register Component', () => {
    test('renders register form elements including phone number', () => {
        const store = createMockStore({
            users: { user: null, isError: false, isSuccess: false, isLoading: false, message: '' }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your phone number/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('updates input fields including phone', () => {
        const store = createMockStore({
            users: { user: null, isError: false, isSuccess: false, isLoading: false, message: '' }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        const unameInput = screen.getByPlaceholderText(/Enter your username/i);
        const emailInput = screen.getByPlaceholderText(/Enter your email/i);
        const phoneInput = screen.getByPlaceholderText(/Enter your phone number/i);

        fireEvent.change(unameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });

        expect(unameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('test@example.com');
        expect(phoneInput.value).toBe('1234567890');
    });

    test('shows error message when user already exists', () => {
        const store = createMockStore({
            users: { user: null, isError: true, isSuccess: false, isLoading: false, message: 'User already exists' }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/User already exists/i)).toBeInTheDocument();
    });
});
