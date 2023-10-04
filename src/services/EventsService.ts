import {
  EventRegistrationRequestType,
  deregisterEventByUserIdApi,
  getAllEventsApi,
  getRegsiteredEventsByUserIdApi,
  registerEventByUserIdApi,
} from "../api/EventsSvcClient";
import { EventType } from "../types/EventType";
import { RegistrationType } from "../types/RegistrationType";

export const getAllEvents = async (): Promise<EventType[]> => {
  const events = await getAllEventsApi();
  if (!events || events instanceof Error) {
    return [];
  }
  return events.map((eventResp) => {
    const event: EventType = {
      id: eventResp.id,
      name: eventResp.event_name,
      category: eventResp.event_category,
      startTime: eventResp.start_time,
      endTime: eventResp.end_time,
      // map other properties as needed
    };
    return event;
  });
};

export const getRegsteredEventsByUserId = async (
  userId: number
): Promise<EventType[]> => {
  const events = await getRegsiteredEventsByUserIdApi(userId);
  if (!events || events instanceof Error) {
    return [];
  }
  return events.map((eventResp) => {
    const event: EventType = {
      id: eventResp.id,
      name: eventResp.event_name,
      category: eventResp.event_category,
      startTime: eventResp.start_time,
      endTime: eventResp.end_time,
    };
    return event;
  });
};

export const regsterEventByUserId = async (
  userId: number,
  eventId: number
): Promise<RegistrationType> => {
  const reqistrationRequest: EventRegistrationRequestType = {
    user_id: userId,
    event_id: eventId,
  };
  const registrationResp = await registerEventByUserIdApi(reqistrationRequest);
  if (!registrationResp || registrationResp instanceof Error) {
    return {} as RegistrationType;
  }
  const registration: RegistrationType = {
    id: registrationResp.id,
    eventId: registrationResp.event_id,
    userId: registrationResp.user_id,
    updatedAt: registrationResp.updated_at,
    createdAt: registrationResp.created_at,
  };
  return registration;
};

export const deregisterEventByUserId = async (
    userId: number,
    eventId: number
  ): Promise<void> => {
    const dereqistrationRequest: EventRegistrationRequestType = {
      user_id: userId,
      event_id: eventId,
    };
    await deregisterEventByUserIdApi(dereqistrationRequest);
  };
