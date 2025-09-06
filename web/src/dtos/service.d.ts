type Service = {
  id: string;
  title: string;
  value: number;
  status: 'ACTIVE' | 'INACTIVE';
};

type ServiceAPIResponse = {
  services: Service[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};
