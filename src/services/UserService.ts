import { getUserApi } from "../api/UserSvcClient";
import { UserType } from "../types/UserType";

export const getUser = async (
  userId: string
): Promise<UserType | undefined> => {
  const userResp = await getUserApi(userId);
  if (!userResp || userResp instanceof Error) {
    return undefined;
  }
  const user: UserType = {
    id: userResp.id,
    userId: userResp.user_id,
    createdAt: userResp.created_at,
    updatedAt: userResp.updated_at,
  };
  return user
};
