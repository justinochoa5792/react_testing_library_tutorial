import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("username input should change", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("password input should be rendered", () => {
  render(<Login />);
  const userPasswordEl = screen.getByPlaceholderText(/password/i);
  expect(userPasswordEl).toBeInTheDocument();
});

test("password input should be empty", () => {
  render(<Login />);
  const userPasswordEl = screen.getByPlaceholderText(/password/i);
  expect(userPasswordEl.value).toBe("");
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputEL = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(passwordInputEL, { target: { value: testValue } });
  expect(passwordInputEL.value).toBe(testValue);
});

test("button input should be rendered", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeInTheDocument();
});

test("button input should be disabled", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userPasswordEl = screen.getByPlaceholderText(/password/i);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(userPasswordEl, { target: { value: testValue } });
  fireEvent.click(buttonInputEl);
  expect(buttonInputEl).toHaveTextContent(/please wait/i);
});

test("button input should not be disabled when input exists", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userPasswordEl = screen.getByPlaceholderText(/password/i);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(userPasswordEl, { target: { value: testValue } });

  expect(buttonInputEl).not.toBeDisabled();
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorMessage = screen.getByTestId("error");
  expect(errorMessage).not.toBeVisible();
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
