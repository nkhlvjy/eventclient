import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Event from "./Event";
import { EventType } from "../types/EventTypes";
import '@testing-library/jest-dom'

const mockEvent: EventType = {
  id: 1,
  name: "Sample Event",
  category: "Sample Category",
  startTime: new Date("2023-01-01T10:00:00Z"),
  endTime: new Date("2023-01-01T12:00:00Z"),
};

test("renders Event component with 'Select' button when not registered", () => {
  const onClickButton = jest.fn();
  render(<Event event={mockEvent} isRegistered={false} onClickButton={onClickButton} />);
  
  const selectButton = screen.getByText("Select");

  expect(selectButton).toBeInTheDocument();
  
  fireEvent.click(selectButton); // Simulate a button click
  expect(onClickButton).toHaveBeenCalledTimes(1);
});

test("renders Event component when registered", () => {
  const onClickButton = jest.fn();
  render(<Event event={mockEvent} isRegistered={true} onClickButton={onClickButton} />);
  
  const eventElement = screen.getByText("Sample Event");
  const removeButton = screen.getByText("Remove");

  expect(eventElement).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
  
  fireEvent.click(removeButton); // Simulate a button click
  expect(onClickButton).toHaveBeenCalledTimes(1);
});

test("renders Event component with 'Remove' button when registered", () => {
  const onClickButton = jest.fn();
  render(<Event event={mockEvent} isRegistered={true} onClickButton={onClickButton} />);
  
  const removeButton = screen.getByText("Remove");
  
  fireEvent.click(removeButton); // Simulate a button click
  expect(onClickButton).toHaveBeenCalledTimes(1);
});
