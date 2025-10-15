import type { UserType } from "./UserType";

export interface Props {
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  selectedUser:UserType | null;
  scaleCard:any | null;
}