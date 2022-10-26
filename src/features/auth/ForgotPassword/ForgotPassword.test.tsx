import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { renderWithProviders } from 'utils/test-utils';
import { handlers } from 'utils/test-handlers';
import { BASE_API_URL } from 'utils/constants';
import { ValidateEmail } from 'features/auth/ForgotPassword/ValidateEmail';
import { PasswordReset } from 'features/auth/ForgotPassword/PasswordReset';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ValidateEmail', () => {
  it('should render the form', () => {
    renderWithProviders(<ValidateEmail />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const email = screen.getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();

    const submit = screen.getByRole('button', {
      name: /recover your password/i,
    });
    expect(submit).toBeInTheDocument();
  });

  it('should show an error if the email is not valid', async () => {
    renderWithProviders(<ValidateEmail />);

    const email = screen.getByPlaceholderText(/email/i);
    const submit = screen.getByRole('button', {
      name: /recover your password/i,
    });

    await userEvent.click(submit);
    expect(await screen.findByText('Email is required')).toBeInTheDocument();

    userEvent.type(email, 'invalid-email');

    await userEvent.click(submit);
    expect(
      await screen.findByText('Email must be a valid email')
    ).toBeInTheDocument();
  });

  it('should show an error if the email does not exist', async () => {
    server.use(
      rest.post(`${BASE_API_URL}/auth/recover`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'Email does not exist.',
          })
        );
      })
    );
    renderWithProviders(<ValidateEmail />);

    const email = screen.getByPlaceholderText(/email/i);
    const submit = screen.getByRole('button', {
      name: /recover your password/i,
    });

    userEvent.type(email, 'joe@gmail.com');
    await userEvent.click(submit);

    expect(
      await screen.findByText('Email does not exist, please try again.')
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Well done, we'll email you with a reset link.")
    ).not.toBeInTheDocument();
  });

  it('should show a success message if the email exists', async () => {
    renderWithProviders(<ValidateEmail />);

    const email = screen.getByPlaceholderText(/email/i);
    const submit = screen.getByRole('button', {
      name: /recover your password/i,
    });

    userEvent.type(email, 'joe@example.com');
    await userEvent.click(submit);

    expect(
      await screen.findByText("Well done, we'll email you with a reset link.")
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Email does not exist, please try again.')
    ).not.toBeInTheDocument();
  });
});

describe('PasswordReset', () => {
  it('should render the form', async () => {
    renderWithProviders(<PasswordReset token="token" />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const password = await screen.findByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();

    const submit = screen.getByRole('button', {
      name: /recover your password/i,
    });
    expect(submit).toBeInTheDocument();
  });

  it('should show an error if the password is not valid', async () => {
    renderWithProviders(<PasswordReset token="token" />);

    const password = await screen.findByPlaceholderText(/password/i);
    const submit = screen.getByRole('button', {
      name: /recover your password/i,
    });

    userEvent.click(submit);
    expect(await screen.findByText('Password is required')).toBeInTheDocument();

    userEvent.type(password, '123456');
    userEvent.click(submit);

    expect(
      await screen.findByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
  });

  it('should show an error if the token is invalid', async () => {
    server.use(
      rest.get(
        `${BASE_API_URL}/auth/reset-password/:token`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message: 'Invalid token',
            })
          );
        }
      )
    );
    renderWithProviders(<PasswordReset token="token" />);

    expect(
      await screen.findByText('Password reset token is invalid or has expired.')
    ).toBeInTheDocument();
  });

  it('should redirect to login page and show success message if the password is reset', async () => {
    renderWithProviders(<PasswordReset token="token" />);

    const password = await screen.findByPlaceholderText(/password/i);
    const submit = screen.getByRole('button', {
      name: /recover your password/i,
    });

    await act(() => {
      userEvent.type(password, '12345678');
      userEvent.click(submit);
    });

    expect(screen.queryByText('back to login')).not.toBeInTheDocument();
  });
});
