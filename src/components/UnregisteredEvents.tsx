import React from "react";
import Card from "./UI/Card";
import { EventType } from "../types/EventTypes";
import Event from "./Event";
import "./UnregisteredEvents.css";

export type UnregisteredEventsPropsType = {
  events: EventType[];
  onClickButton: (id: number) => void;
};

const UnregisteredEvents = (props: UnregisteredEventsPropsType) => {
  const eventsUI = props.events.map((event) => {
    return (
      <Event
        event={{
          id: event.id,
          name: event.name,
          category: event.category,
          startTime: event.startTime,
          endTime: event.endTime,
        }}
        isRegistered={false}
        onClickButton={() => {
          props.onClickButton(event.id);
        }}
      />
    );
  });
  return (
    <Card>
      <div className="unregistered-events-title">Unregistered Events</div>
      <div className="unregistered-events-list">{eventsUI}</div>
    </Card>
  );
};

export default UnregisteredEvents;
