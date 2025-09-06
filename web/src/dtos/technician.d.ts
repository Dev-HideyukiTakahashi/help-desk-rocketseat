type Technician = {
  id: string;
  email: string;
  name: string;
  role: string;
  availability: Date[];
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
