import { useLocalStorage } from "react-use";
import { generateId } from "../utils/id";

export const useUser = () => {
  const [userId] = useLocalStorage<string>("userId", generateId());

  return userId as string;
};
