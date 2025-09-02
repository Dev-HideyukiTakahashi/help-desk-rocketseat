type UserAPIRole = 'employee' | 'manager';

type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserAPIRole;
  };
};
