import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../../../src/components/UI/Card";
import '@testing-library/jest-dom';

test("renders the Card component with children", () => {
  render(<Card>Test Content</Card>);
  const card = screen.getByText("Test Content");
  expect(card).toBeInTheDocument();
});
