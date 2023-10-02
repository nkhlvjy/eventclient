import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../src/components/UI/Button";
import '@testing-library/jest-dom';

test("renders button with correct text", () => {
  render(<Button name="Click Me" intent={true} onClick={() => {}} />);
  const button = screen.getByText("Click Me");
  expect(button).toBeInTheDocument();
});

test("applies correct class when intent is true", () => {
  render(<Button name="Button" intent={true} onClick={() => {}} />);
  const button = screen.getByText("Button");
  expect(button).toHaveClass("ui-button");
});

test("applies correct class when intent is false", () => {
  render(<Button name="Button" intent={false} onClick={() => {}} />);
  const button = screen.getByText("Button");
  expect(button).toHaveClass("ui-button-bold");
});

test("calls onClick callback when clicked", () => {
  const onClickMock = jest.fn();
  render(<Button name="Button" intent={true} onClick={onClickMock} />);
  const button = screen.getByText("Button");
  fireEvent.click(button);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
