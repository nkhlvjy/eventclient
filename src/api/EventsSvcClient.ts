import axios from "axios";

export const EventsClient = axios.create({
	baseURL: "http://localhost",
});

export type EventResponseType = {
    id: number;
    event_name: string;
    event_category: string;
    start_time: Date;
    end_time: Date;
}

export type EventRegistrationRequestType = {
    event_id: number;
    user_id: number;
}

export type EventRegistrationResponseType = {
    id: number;
    user_id: number;
    event_id: number;
    created_at: Date;
    updated_at: Date
}


export const getAllEventsApi = async (): Promise<EventResponseType[] | Error> => {
	try {
		const resp = await EventsClient.get<EventResponseType[]>(
			'/api/v1/events'
		);
		return resp.data;
	} catch (error) {
		return new Error("Some error occurred");
	}
};

export const getRegsiteredEventsByUserIdApi = async (userId: number): Promise<EventResponseType[] | Error> => {
	try {
		const resp = await EventsClient.get<EventResponseType[]>(
			`/api/v1/registered-events/${userId}`
		);
		return resp.data;
	} catch (error) {
		return new Error("Some error occurred");
	}
};

export const registerEventByUserIdApi = async (request: EventRegistrationRequestType): Promise<EventRegistrationResponseType | Error> => {
	try {
		const resp = await EventsClient.post<EventRegistrationResponseType>(
			'/api/v1/registrations',
            request
		);
		return resp.data;
	} catch (error) {
		return new Error("Some error occurred");
	}
};

export const deregisterEventByUserIdApi = async (request: EventRegistrationRequestType): Promise<void | Error> => {
	try {
		await EventsClient.post<EventRegistrationResponseType>(
			'/api/v1/deregistrations',
            request
		);
	} catch (error) {
		return new Error("Some error occurred");
	}
};