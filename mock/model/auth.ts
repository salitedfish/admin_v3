interface UserModel extends Auth.UserInfo {
  token: string;
  refreshToken: string;
  password: string;
}

export const userModel: UserModel[] = [
  {
    token: '__TOKEN_SOYBEAN__',
    refreshToken: '__REFRESH_TOKEN_SOYBEAN__',
    userId: '0',
    userName: 'Soybean',
    userRouts: [
      '403',
      '404',
      '500',
      'constant-page',
      'login',
      'not-found',
      'multi-menu',
      'multi-menu_first',
      'multi-menu_first_second-new',
      'multi-menu_first_second-new_third-new',
      'multi-menu_first_second-new_third',
      'multi-menu_first_second'
    ],
    password: 'soybean123'
  },
  {
    token: '__TOKEN_SUPER__',
    refreshToken: '__REFRESH_TOKEN_SUPER__',
    userId: '1',
    userName: 'Super',
    userRouts: [
      '403',
      '404',
      '500',
      'constant-page',
      'login',
      'not-found',
      'multi-menu',
      'multi-menu_first',
      'multi-menu_first_second-new',
      'multi-menu_first_second-new_third-new',
      'multi-menu_first_second-new_third',
      'multi-menu_first_second'
    ],
    password: 'super123'
  },
  {
    token: '__TOKEN_ADMIN__',
    refreshToken: '__REFRESH_TOKEN_ADMIN__',
    userId: '2',
    userName: 'Admin',
    userRouts: [
      '403',
      '404',
      '500',
      'constant-page',
      'login',
      'not-found',
      'multi-menu',
      'multi-menu_first',
      'multi-menu_first_second-new',
      'multi-menu_first_second-new_third-new',
      'multi-menu_first_second-new_third',
      'multi-menu_first_second'
    ],
    password: 'admin123'
  },
  {
    token: '__TOKEN_USER01__',
    refreshToken: '__REFRESH_TOKEN_USER01__',
    userId: '3',
    userName: 'User01',
    userRouts: [
      '403',
      '404',
      '500',
      'constant-page',
      'login',
      'not-found',
      'multi-menu',
      'multi-menu_first',
      'multi-menu_first_second-new',
      'multi-menu_first_second-new_third-new',
      'multi-menu_first_second-new_third',
      'multi-menu_first_second'
    ],
    password: 'user01123'
  }
];
