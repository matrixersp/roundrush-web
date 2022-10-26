import {
  act,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from 'utils/test-utils';
import { BASE_API_URL } from 'utils/constants';
import { Login } from 'features/auth/Login';
import App from 'app/App';
import { handlers } from 'utils/test-handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Login', () => {
  it('should render', () => {
    renderWithProviders(<Login />);

    expect(
      screen.getByText(/THE OPTIMIZED WORKFLOW OUT OF THE BOX/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId('Login')).toBeInTheDocument();

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    expect(screen.getByTestId('register-link')).toBeInTheDocument();
    expect(screen.getByTestId('forgot-password-link')).toBeInTheDocument();
  });

  it('should render error message on failed login', async () => {
    server.use(
      rest.post(`${BASE_API_URL}/auth`, async (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ error: 'Invalid email or password.' })
        );
      })
    );

    renderWithProviders(<Login />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    const fakeUser = {
      email: 'joe@example.com',
      password: 'password',
    };
    userEvent.type(emailInput, fakeUser.email);
    userEvent.type(passwordInput, fakeUser.password);
    expect(screen.getByRole('form')).toHaveFormValues(fakeUser);

    userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    const error = await screen.findByRole('alert');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(
      'Please make sure you have the correct email and password'
    );
  });

  it('should login given valid credentials', async () => {
    renderWithProviders(<Login />);
    const form = screen.getByRole('form');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    const fakeUser = {
      email: 'joe@example.com',
      password: 'password',
    };
    userEvent.type(emailInput, fakeUser.email);
    userEvent.type(passwordInput, fakeUser.password);
    expect(form).toHaveFormValues(fakeUser);

    userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    await waitForElementToBeRemoved(form);
  });

  it('should redirect to dashboard if logged in', async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        auth: {
          loading: false,
          loggedIn: true,
        },
      },
    });

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.queryByTestId('Login')).not.toBeInTheDocument();
  });

  it('should not display validation errors if fields are untouched', async () => {
    renderWithProviders(<Login />);
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  it('should display validation errors if fields are touched and invalid', async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('should not display validation errors if fields are touched and valid', async () => {
    renderWithProviders(<Login />);

    const form = screen.getByRole('form');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    const fakeUser = {
      email: 'joe@example.com',
      password: 'password',
    };
    await userEvent.type(emailInput, fakeUser.email);
    await userEvent.type(passwordInput, fakeUser.password);
    expect(form).toHaveFormValues(fakeUser);

    await act(() => {
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });

    expect(form).toBeValid();

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  it('should not display validation errors if fields are touched and invalid and then valid', async () => {
    renderWithProviders(<Login />);
    const form = screen.getByRole('form');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();

    const fakeUser = {
      email: 'joe@example.com',
      password: 'password',
    };
    userEvent.type(emailInput, fakeUser.email);
    userEvent.type(passwordInput, fakeUser.password);
    expect(form).toHaveFormValues(fakeUser);

    await act(() => {
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });

    expect(form).toBeValid();

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  it('should display validation errors if fields are touched and valid and then invalid', async () => {
    renderWithProviders(<Login />);
    const form = screen.getByRole('form');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    const fakeUser = {
      email: 'joe@example.com',
      password: 'password',
    };

    userEvent.type(emailInput, fakeUser.email);
    userEvent.type(passwordInput, fakeUser.password);
    expect(form).toHaveFormValues(fakeUser);

    await act(() => {
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });

    expect(form).toBeValid();

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    expect(form).toHaveFormValues({ email: '', password: '' });

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('should redirect to forgot password page if forgot password link is clicked', async () => {
    renderWithProviders(<App />);
    const loginTitle = screen.getByTestId('Login');

    expect(loginTitle).toBeInTheDocument();
    expect(
      screen.queryByTestId('Forgot your password')
    ).not.toBeInTheDocument();

    const forgotPasswordLink = screen.getByTestId('forgot-password-link');
    userEvent.click(forgotPasswordLink);

    expect(loginTitle).not.toBeInTheDocument();
    expect(screen.getByTestId('Forgot your password')).toBeInTheDocument();
  });

  it('should redirect to register page if register link is clicked', async () => {
    renderWithProviders(<App />);
    const loginTitle = screen.getByTestId('Login');

    expect(loginTitle).toBeInTheDocument();
    expect(screen.queryByTestId('Sign up')).not.toBeInTheDocument();

    const registerLink = screen.getByTestId('register-link');
    userEvent.click(registerLink);

    expect(loginTitle).not.toBeInTheDocument();
    expect(screen.getByTestId('Sign up')).toBeInTheDocument();
  });

  // it('should render reset password message', () => {
  //   renderWithProviders(<Login />, {
  //     preloadedState: {
  //       auth: {
  //         loading: false,
  //         loggedIn: false,
  //         error: '',
  //       },
  //     },
  //     route: '/login?reset=true',
  //   });
  //   const message = screen.getByRole('alert');
  //   expect(message).toBeInTheDocument();
  //   expect(message).toHaveTextContent(
  //     'Well done. The password was reset successfully'
  //   );
  // });
});
