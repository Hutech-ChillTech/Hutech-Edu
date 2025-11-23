
import { getAuth, type User } from 'firebase/auth';

export const getAccessToken = async (forceRefresh: boolean = false): Promise<string | null> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  try {
    // forceRefresh = true sẽ ép Firebase lấy token mới (dùng khi token cũ hết hạn)
    const token = await currentUser.getIdToken(forceRefresh);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};


export const getCurrentUser = (): User | null => {
  const auth = getAuth();
  return auth.currentUser;
};