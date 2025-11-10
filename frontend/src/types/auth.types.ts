export interface RegisterUserDto {
    email: string;
    password: string;
    fullName: string;
    photo?: string;
    role?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UserDto {
    id?: string;
    email: string;
    fullName: string;
    photo?: string;
    role: string;
}

export interface AuthResponseDto {
    token: string;
    user: UserDto;
    expiresAt: Date;
}