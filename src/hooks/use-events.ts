import { useCallback } from "react";
import * as EventsService from "./../services/EventsService";
import { useDispatch, useSelector } from "react-redux";
import { eventsSliceSelector } from "../store/events/events.selector";
import {
  updateAllEvents,
  updateRegisteredEvents,
} from "./../store/events/events.slice";

export const useEvents = () => {
  const eventsState = useSelector(eventsSliceSelector);
  const dispatch = useDispatch();

  const unRegisteredEvents = eventsState.allEvents.filter((event) => {
    return !eventsState.registeredEvents.some(
      (registeredEvent) => registeredEvent.id === event.id
    );
  });

  const registeredEvents = eventsState.registeredEvents;

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

  const onClickUnregisteredEventButton = (eventId: number) => {
    const event = eventsState.allEvents.filter(
      (event) => event.id === eventId
    )[0];
    const isClashing = registeredEvents.some((registeredEvent) => {
        const x = registeredEvent.endTime <= event.startTime;
        const y = event.endTime <= registeredEvent.startTime;
        return !(x || y);
    });
    if (registeredEvents.length >= 3 || isClashing) {
        return;
      }
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

  return {
    getAllEvents,
    getRegsteredEventsByUserId,
    onClickUnregisteredEventButton,
    onClickRegisteredEventButton,
    unRegisteredEvents,
    registeredEvents,
  };
};
