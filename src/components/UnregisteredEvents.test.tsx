import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UnregisteredEvents from "./UnregisteredEvents";
import { EventType } from "../types/EventTypes";
import '@testing-library/jest-dom'

const mockEvents: EventType[] = [
  {
    id: 1,
    name: "Event 1",
    category: "Category 1",
    startTime: new Date("2023-01-01T10:00:00Z"),
    endTime: new Date("2023-01-01T12:00:00Z"),
  },
  {
    id: 2,
    name: "Event 2",
    category: "Category 2",
    startTime: new Date("2023-01-02T10:00:00Z"),
    endTime: new Date("2023-01-02T12:00:00Z"),
  },
];

test("renders UnregisteredEvents component with a title", () => {
  const onClickButton = jest.fn();
  render(<UnregisteredEvents events={[]} onClickButton={onClickButton} />);
  
  const titleElement = screen.getByText("Unregistered Events");
  expect(titleElement).toBeInTheDocument();
});

test("renders UnregisteredEvents component with event list", () => {
  const onClickButton = jest.fn();
  render(<UnregisteredEvents events={mockEvents} onClickButton={onClickButton} />);
  
  const event1Element = screen.getByText("Event 1");
  const event2Element = screen.getByText("Event 2");
  
  expect(event1Element).toBeInTheDocument();
  expect(event2Element).toBeInTheDocument();
});

test("calls onClickButton when 'Select' button is clicked", () => {
  const onClickButton = jest.fn();
  render(<UnregisteredEvents events={mockEvents} onClickButton={onClickButton} />);
  
  const selectButtons = screen.getAllByText("Select");
  
  fireEvent.click(selectButtons[0]);
  
  expect(onClickButton).toHaveBeenCalledTimes(1);
  expect(onClickButton).toHaveBeenCalledWith(1);
});
