import { UserDto } from "./userDto";

export interface Training {
    id: number;
    name: string;
    date: string;
    duration: string;
    technology: string;
    categoryType: string;
    acceptedUsers: number;
    nrMin: number;
    nrMax: number;
    trainingResponsible: UserDto;
    vendor: string;
}
