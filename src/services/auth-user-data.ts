import { TUserData } from '../types/user-data.ts';

type TStorageUserData = Pick<TUserData, 'email' | 'avatarUrl' | 'token'>;

enum UserDataTypes {
  Email = 'email',
  AvatarUrl = 'avatarUrl',
  Token = 'token',
}

export const getStorageUserData = (): TStorageUserData => {
  const email = localStorage.getItem(UserDataTypes.Email);
  const avatarUrl = localStorage.getItem(UserDataTypes.AvatarUrl);
  const token = localStorage.getItem(UserDataTypes.Token);
  return {
    email: email ?? '',
    avatarUrl: avatarUrl ?? '',
    token: token ?? '',
  };
};

export const saveStorageUserData = ({
  email,
  avatarUrl,
  token,
}: TUserData): void => {
  localStorage.setItem(UserDataTypes.Email, email);
  localStorage.setItem(UserDataTypes.AvatarUrl, avatarUrl);
  localStorage.setItem(UserDataTypes.Token, token);
};

export const dropStorageUserData = (): void => {
  localStorage.clear();
};
