import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisteredEvents from "../../src/components/RegisteredEvents";
import { EventType } from "../../src/types/EventTypes";
import '@testing-library/jest-dom';

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

test("renders RegisteredEvents component with a title", () => {
  const onClickButton = jest.fn();
  render(<RegisteredEvents events={[]} onClickButton={onClickButton} />);
  
  const titleElement = screen.getAllByText("Registered Events");
  expect(titleElement[0]).toBeInTheDocument();
});

test("renders RegisteredEvents component with event list", () => {
  const onClickButton = jest.fn();
  render(<RegisteredEvents events={mockEvents} onClickButton={onClickButton} />);
  
  const event1Element = screen.getByText("Event 1");
  const event2Element = screen.getByText("Event 2");
  
  expect(event1Element).toBeInTheDocument();
  expect(event2Element).toBeInTheDocument();
});

test("calls onClickButton when 'Remove' button is clicked", () => {
  const onClickButton = jest.fn();
  render(<RegisteredEvents events={mockEvents} onClickButton={onClickButton} />);
  
  const removeButtons = screen.getAllByText("Remove");
  
  fireEvent.click(removeButtons[0]);
  
  expect(onClickButton).toHaveBeenCalledTimes(1);
  expect(onClickButton).toHaveBeenCalledWith(1);
});
