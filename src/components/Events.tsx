import React, { useCallback, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import RegisteredEvents from "./RegisteredEvents";
import UnregisteredEvents from "./UnregisteredEvents";
import * as EventsService from "./../services/EventsService";
import { useDispatch, useSelector } from "react-redux";
import { eventsSliceSelector } from "../store/events/events.selector";
import {
  updateAllEvents,
  updateRegisteredEvents,
} from "./../store/events/events.slice";
import "./Events.css";

const Events = () => {
  const eventsState = useSelector(eventsSliceSelector);
  const dispatch = useDispatch();

  const getAllEvents = useCallback(() => {
    EventsService.getAllEvents().then((events) => {
      dispatch(updateAllEvents(events));
    });
  }, [dispatch]);

  const getRegsteredEventsByUserId = useCallback(
    (userId: number) => {
      EventsService.getRegsteredEventsByUserId(userId).then((events) => {
        dispatch(updateRegisteredEvents(events));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getAllEvents();
    getRegsteredEventsByUserId(1);
  }, [getAllEvents, getRegsteredEventsByUserId]);

  const onClickUnregisteredEventButton = (eventId: number) => {
    const newRegisteredEvents = eventsState.registeredEvents.concat(
      eventsState.allEvents.filter((event) => {
        return event.id === eventId;
      })
    );
    EventsService.regsterEventByUserId(1, eventId).then((registration) => {
      dispatch(updateRegisteredEvents(newRegisteredEvents));
    });
  };

  const onClickRegisteredEventButton = (eventId: number) => {
    const newRegisteredEvents = eventsState.registeredEvents.filter((event) => {
      return event.id !== eventId;
    });
    EventsService.deregisterEventByUserId(1, eventId).then(() => {
      dispatch(updateRegisteredEvents(newRegisteredEvents));
    });
  };

  const unRegisteredEvents = eventsState.allEvents.filter((event) => {
    return !eventsState.registeredEvents.some(
      (registeredEvent) => registeredEvent.id === event.id
    );
  });

  return (
    <>
      <Header />
      <div className="events">
        <UnregisteredEvents
          events={unRegisteredEvents}
          onClickButton={onClickUnregisteredEventButton}
        />
        <RegisteredEvents
          events={eventsState.registeredEvents}
          onClickButton={onClickRegisteredEventButton}
        />
      </div>
      <Footer />
    </>
  );
};

export default Events;
