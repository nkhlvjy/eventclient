import React, { useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import RegisteredEvents from "./RegisteredEvents";
import UnregisteredEvents from "./UnregisteredEvents";
import "./Events.css";
import { useEvents } from "../hooks/use-events";
import { useSelector} from "react-redux"
import { userSliceSelector } from "../store/user/user.selector";

const Events = () => {
  const userSlice = useSelector(userSliceSelector);
  const {
    getAllEvents,
    getRegsteredEventsByUserId,
    onClickRegisteredEventButton,
    onClickUnregisteredEventButton,
    unRegisteredEvents,
    registeredEvents,
  } = useEvents();

  useEffect(() => {
    if(userSlice.user && userSlice.user.id) {
      getAllEvents();
      getRegsteredEventsByUserId(userSlice.user?.id);
    }
  }, [getAllEvents, getRegsteredEventsByUserId, userSlice.user]);

  return userSlice.user && userSlice.user.id ? (
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
  ) : (<div>
    Please login <a href="/">here</a>
  </div>);
};

export default Events;
