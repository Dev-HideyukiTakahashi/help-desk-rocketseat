type Client = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type ClientAPIResponse = {
  clients: Client[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};

type ClientAPIRequest = {
  id?: string;
  email: string;
  name: string;
  profilePhoto?: string;
};
