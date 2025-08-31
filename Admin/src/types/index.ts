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
  customerId: string;
  location: Location;
  items: WasteItem[];
  status: 'Accepted' | 'In Progress' | 'Completed';
  collectorLocation: Location;
  requestType: string;
  createdAt: Date;
  updatedAt: Date;
  collectorId?: string;
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
  password: string;
  role: 'customer' | 'collector';
  address: Address;
  wasteTypes: string[];
  fcmToken: string;
  createdAt: Date;
  updatedAt: Date;
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

// MongoDB document interfaces
export interface IUser {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: 'customer' | 'collector';
  address: {
    addressNo: string;
    street: string;
    city: string;
    district: string;
  };
  wasteTypes: string[];
  fcmToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPickupRequest {
  _id?: string;
  customerId: string;
  location: {
    type: string;
    coordinates: number[];
  };
  items: Array<{
    type: string;
    quantity: number;
    description: string;
  }>;
  status: 'Accepted' | 'In Progress' | 'Completed';
  collectorLocation: {
    type: string;
    coordinates: number[];
  };
  requestType: string;
  collectorId?: string;
  createdAt: Date;
  updatedAt: Date;
}
