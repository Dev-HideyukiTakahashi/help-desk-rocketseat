type Technician = {
  id: string;
  email: string;
  name: string;
  role: string;
  availability: string[];
};

type TechnicianAPIResponse = {
  technicians: Technician[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};

type TechnicianAPIRequest = {
  id?: string;
  email: string;
  name: string;
  profilePhoto?: string;
  availability: string[];
};
