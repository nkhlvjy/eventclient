import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../src/components/layout/Header";
import '@testing-library/jest-dom';

test("renders the header text correctly", () => {
  render(<Header />);
  const headerElement = screen.getByText("Sports Day Events");
  expect(headerElement).toBeInTheDocument();
});

test("applies the 'header' class", () => {
  render(<Header />);
  const headerElement = screen.getByText("Sports Day Events");
  expect(headerElement).toHaveClass("header");
});
