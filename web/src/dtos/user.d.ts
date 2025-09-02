type UserAPIRole = 'ADMIN' | 'CLIENT' | 'TECHNICIAN';

type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserAPIRole;
  };
};
