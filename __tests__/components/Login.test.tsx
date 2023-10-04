import React, { Dispatch } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { getUser } from "../../src/services/UserService";
import Login from "../../src/components/Login";
import { AnyAction } from "@reduxjs/toolkit";
import { UserType } from "../../src/types/UserType";
import "@testing-library/jest-dom";
import { updateUser } from "../../src/store/user/user.slice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn<Dispatch<AnyAction>, []>(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn<NavigateFunction, []>(),
}));

jest.mock("../../src/services/UserService", () => ({
  getUser: jest.fn<(userId: string) => Promise<UserType | undefined>, []>(),
}));

describe("Login Component", () => {
  let dispatchMock: jest.Mock<Dispatch<AnyAction>>;
  let navigateMock: jest.Mock<NavigateFunction>;

  beforeEach(() => {
    dispatchMock = jest.fn();
    navigateMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it("renders the Login component", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    expect(getByText("Login here!")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("handles username input change", () => {
    const { getByPlaceholderText } = render(<Login />);
    const inputElement = getByPlaceholderText(
      "Enter username"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "testuser" } });
    expect(inputElement.value).toBe("testuser");
  });

  it("submits login with valid username", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const inputElement = getByPlaceholderText(
      "Enter username"
    ) as HTMLInputElement;
    const enterButton = getByText("Enter");
    const mockUser: UserType = {
        id: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    (getUser as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    fireEvent.change(inputElement, { target: { value: "testuser" } });
    fireEvent.click(enterButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        updateUser(mockUser)
      );
      expect(navigateMock).toHaveBeenCalledWith("/register");
    });
  });

  it("displays error message for invalid username", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const inputElement = getByPlaceholderText(
      "Enter username"
    ) as HTMLInputElement;
    const enterButton = getByText("Enter");
    (getUser as jest.Mock).mockResolvedValue(null);

    fireEvent.change(inputElement, { target: { value: "invaliduser" } });
    fireEvent.click(enterButton);

    await waitFor(() => {
      expect(dispatchMock).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
      expect(
        getByText("Invalid username. Please try again or contact admin.")
      ).toBeInTheDocument();
    });
  });
});
