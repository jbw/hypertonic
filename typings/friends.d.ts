export interface User {
    aboutMe: string;
    avatar: string;
    city: string;
    country: string;
    dateOfBirth: string;
    displayName: string;
    encodedId: string;
    fullName: string;
    gender: string;
    height: number;
    offsetFromUTCMillis: number;
    state: string;
    strideLengthRunning: number;
    strideLengthWalking: number;
    timezone: string;
    weight: number;
}

export interface Friend {
    user: User;
}

export interface Friends {
    friends: Friend[];
}
