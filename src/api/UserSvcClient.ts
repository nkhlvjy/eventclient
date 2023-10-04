import axios from "axios";

export const UserClient = axios.create({
	baseURL: "http://localhost",
});

export type UserResponseType = {
    id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date
}


export const getUserApi = async (userId: string): Promise<UserResponseType | Error> => {
	try {
		const resp = await UserClient.get<UserResponseType>(
			`/api/v1/users/${userId}`
		);
		return resp.data;
	} catch (error) {
		return new Error("Some error occurred");
	}
};