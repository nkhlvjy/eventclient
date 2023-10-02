import React, { useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import RegisteredEvents from "./RegisteredEvents";
import UnregisteredEvents from "./UnregisteredEvents";
import "./Events.css";
import { useEvents } from "../hooks/use-events";

const Events = () => {
  const {
    getAllEvents,
    getRegsteredEventsByUserId,
    onClickRegisteredEventButton,
    onClickUnregisteredEventButton,
    unRegisteredEvents,
    registeredEvents,
  } = useEvents();

  useEffect(() => {
    getAllEvents();
    getRegsteredEventsByUserId(1);
  }, [getAllEvents, getRegsteredEventsByUserId]);

  return (
    <>
      <Header />
      <div className="events">
        <UnregisteredEvents
          events={unRegisteredEvents}
          onClickButton={onClickUnregisteredEventButton}
        />
        <RegisteredEvents
          events={registeredEvents}
          onClickButton={onClickRegisteredEventButton}
        />
      </div>
      <Footer />
    </>
  );
};

export default Events;
