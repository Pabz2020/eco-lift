export interface Location {
  type: string;
  coordinates: number[];
}

export interface WasteItem {
  type: string;
  quantity: number;
  description: string;
  _id: string;
}

export interface PickupRequest {
  _id: string;
  customerId: {
    _id: string;
    name: string;
    email: string;
  };
  location: Location;
  items: WasteItem[];
  status: 'Accepted' | 'In Progress' | 'Completed';
  collectorLocation: Location;
  requestType: string;
  createdAt: string;
  updatedAt: string;
  collectorId?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface Address {
  addressNo?: string;
  street: string;
  city: string;
  district: string;
}

export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: 'customer' | 'collector';
  address: Address;
  wasteTypes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserWithTransactions extends User {
  totalTransactions: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    username: string;
    role: string;
  };
}

export interface DashboardStats {
  totalRequests: number;
  acceptedRequests: number;
  inProgressRequests: number;
  completedRequests: number;
  totalUsers: number;
  totalCollectors: number;
  totalCustomers: number;
}

export interface MapFilter {
  showLocations: boolean;
  showCollectorLocations: boolean;
  filterType: 'All' | 'Locations' | 'CollectorLocations';
}

export interface UserFilter {
  filterType: 'All' | 'Collectors' | 'Customers';
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
