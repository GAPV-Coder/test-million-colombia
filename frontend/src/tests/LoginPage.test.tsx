import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '@/app/login/page';

jest.mock('@/hooks/useAuth', () => ({
    useLogin: () => ({
        mutate: jest.fn(),
        isPending: false,
        error: null
    })
}));

describe('LoginPage', () => {
    it('renders login form correctly', () => {
        render(<LoginPage />);

        expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
    });
});