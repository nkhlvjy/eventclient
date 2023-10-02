import React from "react";
import "./Event.css";
import Button from "./UI/Button";
import { EventType } from "./../types/EventTypes";

type EventProps = {
  event: EventType;
  isRegistered: boolean;
  onClickButton: () => void;
};

const Event = (props: EventProps) => {
  const button = props.isRegistered ? (
    <Button name="Remove" intent={false} onClick={props.onClickButton} />
  ) : (
    <Button name="Select" intent={true} onClick={props.onClickButton} />
  );
  const startTime = new Date(props.event.startTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = new Date(props.event.endTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="event">
      <div className="event-category-initial">
        {props.event.category.charAt(0)}
      </div>
      <div className="event-detail">
        <div className="event-name">{props.event.name}</div>
        ({props.event.category})
        <br />
        {startTime} - {endTime}
        <div>{button}</div>
      </div>
    </div>
  );
};

export default Event;
