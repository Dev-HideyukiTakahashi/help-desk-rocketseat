type Ticket = {
  id: string;
  title: string;
  description: string;
  initialCost: number;
  client: {
    id: string;
    name: string;
  };
  technician: Technician;
  services: {
    id: string;
    title: string;
    value: number;
  }[];
  status: 'OPEN' | 'PROCESSING' | 'CLOSED';
  createdAt: date;
  updatedAt: date;
};

type TicketAPIResponse = {
  tickets: Ticket[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};
