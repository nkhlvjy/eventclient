import React from "react";
import Card from "./UI/Card";
import { EventType } from "../types/EventType";
import Event from "./Event";
import './RegisteredEvents.css';


type RegisteredEventsPropsType = {
  events: EventType[];
  onClickButton: (id: number) => void;
};

const RegisteredEvents = (props: RegisteredEventsPropsType) => {
  const eventsUI = props.events.map((event) => {
    return (
        <Event
          key={event.id}
          event={{
            id: event.id,
            name: event.name,
            category: event.category,
            startTime: event.startTime,
            endTime: event.endTime,
          }}
          isRegistered={true}
          onClickButton={() => {
            props.onClickButton(event.id);
          }}
        />
    );
  });
  return (
    <Card>
      <div className="registered-events-title">Registered Events</div>
      <div className="registered-events-list">{eventsUI}</div>
    </Card>
  );
};

export default RegisteredEvents;
