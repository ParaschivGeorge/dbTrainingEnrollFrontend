import { UserDto } from './userDto';

export class Training {
    id: number;
    name: string;
    date: string;
    technology: string;
    categoryType: string;
    acceptedUsers: number;
    nrMin: number;
    nrMax: number;
    trainingResponsible: UserDto;
    vendor: string;
    rating: number;
}
