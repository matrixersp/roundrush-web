import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { renderWithProviders } from 'utils/test-utils';
import { Signup } from 'features/auth/Signup';
import { handlers } from 'utils/test-handlers';
import { BASE_API_URL } from 'utils/constants';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Signup', () => {
  it('should render correctly', () => {
    const { container } = renderWithProviders(<Signup />);
    expect(container).toMatchSnapshot();
  });
});

describe('ValidateEmail', () => {
  it('should render a form with 1 input and a button', () => {
    renderWithProviders(<Signup />);

    expect(
      screen.getByPlaceholderText('Insert your email')
    ).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should render an error message when the email is invalid', async () => {
    renderWithProviders(<Signup />);

    const input = screen.getByPlaceholderText('Insert your email');
    const button = screen.getByText('Next');

    await userEvent.click(button);
    expect(await screen.findByText('Email is required')).toBeInTheDocument();

    await userEvent.type(input, 'invalid-email');
    await userEvent.click(button);

    expect(
      await screen.findByText('Email must be a valid email')
    ).toBeInTheDocument();
  });

  it('should display a button to authenticate when email already exists', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/auth/verify-email`, async (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'Email already exists',
          })
        );
      })
    );

    renderWithProviders(<Signup />);

    const input = screen.getByPlaceholderText('Insert your email');
    const button = screen.getByText('Next');

    await userEvent.type(input, 'joe@example.com');
    await userEvent.click(button);

    expect(
      await screen.findByText('Click here to authenticate')
    ).toBeInTheDocument();
    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  it('should display a user information form when email does not exist', async () => {
    renderWithProviders(<Signup />);

    const input = screen.getByPlaceholderText('Insert your email');
    const button = screen.getByText('Next');

    await userEvent.type(input, 'joe2@example.com');
    await userEvent.click(button);

    expect(await screen.findByPlaceholderText('Full name')).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Password')).toBeInTheDocument();
    expect(await screen.findByText('Next')).toBeInTheDocument();

    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});

describe('UserInformation', () => {
  const setup = async () => {
    renderWithProviders(<Signup />);
    const input = screen.getByPlaceholderText('Insert your email');
    const button = screen.getByText('Next');

    await userEvent.type(input, 'joe2@example.com');
    await userEvent.click(button);

    expect(await screen.findByPlaceholderText('Full name')).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Password')).toBeInTheDocument();
    expect(await screen.findByText('Next')).toBeInTheDocument();

    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  };

  it('should render a form with 2 inputs and a button', async () => {
    await setup();
    const nameInput = screen.getByPlaceholderText('Full name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByText('Next');

    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display an error message when the name or password are invalid', async () => {
    await setup();
    const nameInput = await screen.findByPlaceholderText('Full name');
    const passwordInput = await screen.findByPlaceholderText('Password');
    const nextButton = await screen.findByText('Next');

    await userEvent.click(nextButton);

    expect(
      await screen.findByText('Full name is required')
    ).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();

    await userEvent.type(nameInput, 'J');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(nextButton);

    expect(
      await screen.findByText('Full name must be at least 2 characters')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
  });

  it('should display organization form when name and password are valid', async () => {
    await setup();
    const nameInput = await screen.findByPlaceholderText('Full name');
    const passwordInput = await screen.findByPlaceholderText('Password');
    const nextButton = await screen.findByText('Next');

    await userEvent.type(nameInput, 'Joe Doe');
    await userEvent.type(passwordInput, '12345678');
    await userEvent.click(nextButton);

    expect(
      await screen.findByPlaceholderText('Company name')
    ).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Space')).toBeInTheDocument();
    expect(await screen.findByText('Industry type')).toBeInTheDocument();
    expect(await screen.findByText('Select a size..')).toBeInTheDocument();
    expect(await screen.findByText('Register')).toBeInTheDocument();

    expect(nameInput).not.toBeInTheDocument();
    expect(passwordInput).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});

describe('OrganizationInformation', () => {
  const setup = async () => {
    renderWithProviders(<Signup />);
    const input = screen.getByPlaceholderText('Insert your email');
    const button = screen.getByText('Next');

    await userEvent.type(input, 'joe@example.com');
    await userEvent.click(button);

    expect(await screen.findByPlaceholderText('Full name')).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Password')).toBeInTheDocument();
    expect(await screen.findByText('Next')).toBeInTheDocument();

    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();

    const nameInput = await screen.findByPlaceholderText('Full name');
    const passwordInput = await screen.findByPlaceholderText('Password');
    const nextButton = await screen.findByText('Next');

    await userEvent.type(nameInput, 'Joe Doe');
    await userEvent.type(passwordInput, '12345678');
    await userEvent.click(nextButton);

    expect(
      await screen.findByPlaceholderText('Company name')
    ).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Space')).toBeInTheDocument();
    expect(await screen.findByText('Industry type')).toBeInTheDocument();
    expect(await screen.findByText('Select a size..')).toBeInTheDocument();
    expect(await screen.findByText('Register')).toBeInTheDocument();

    expect(nameInput).not.toBeInTheDocument();
    expect(passwordInput).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  };

  it('should render a form with 4 inputs and a button', async () => {
    await setup();
    const companyNameInput = screen.getByPlaceholderText('Company name');
    const spaceInput = screen.getByPlaceholderText('Space');
    const industryTypeInput = screen.getByText('Industry type');
    const sizeInput = screen.getByText('Select a size..');
    const registerButton = screen.getByText('Register');

    expect(companyNameInput).toBeInTheDocument();
    expect(spaceInput).toBeInTheDocument();
    expect(industryTypeInput).toBeInTheDocument();
    expect(sizeInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('should display an error message when the company name, space and terms are invalid', async () => {
    await setup();
    const companyNameInput = await screen.findByPlaceholderText('Company name');
    const spaceInput = await screen.findByPlaceholderText('Space');
    const industryTypeInput = await screen.findByTestId('industry-type');
    const registerButton = await screen.findByText('Register');

    await userEvent.click(registerButton);

    expect(
      await screen.findByText('Company name is required')
    ).toBeInTheDocument();
    expect(await screen.findByText('Space is required')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'You must accept the Terms of Use and Privacy Policy'
      )
    ).toBeInTheDocument();

    await userEvent.type(companyNameInput, 'J');
    await userEvent.type(spaceInput, 'S');
    await userEvent.click(industryTypeInput);
    userEvent.click(
      await within(industryTypeInput).findByText('Industry type')
    );
    // userEvent.click(
    //   await screen.findByRole('option', { name: 'Industry type' })
    // );
    // await userEvent.selectOptions(
    //   industryTypeInput,
    //   screen.getByRole('option', { name: 'Agriculture' })
    // );
    await userEvent.click(registerButton);

    expect(
      await screen.findByText('Company name must be at least 2 characters')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Space must be at least 2 characters')
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'You must accept the Terms of Use and Privacy Policy'
      )
    ).toBeInTheDocument();
  });

  it('should register the user when the form is valid', async () => {
    await setup();
    const companyNameInput = await screen.findByPlaceholderText('Company name');
    const spaceInput = await screen.findByPlaceholderText('Space');
    const industryTypeInput = await screen.findByTestId('industry-type');
    const sizeInput = await screen.findByTestId('employees-size');
    const registerButton = await screen.findByText('Register');
    const termsCheckbox = await screen.findByTestId('accept-terms');

    await userEvent.type(companyNameInput, 'Company');
    await userEvent.type(spaceInput, 'Space');
    // await userEvent.click(industryTypeInput);
    // userEvent.click(await within(industryTypeInput).findByText('Agriculture'));
    // await userEvent.click(sizeInput);
    // userEvent.click(await within(sizeInput).findByText('1-10'));
    await userEvent.click(termsCheckbox);
    await userEvent.click(registerButton);

    expect(
      await screen.findByText('Your account is ready!')
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: 'Go to login page' })
    ).toBeInTheDocument();
  });
});
