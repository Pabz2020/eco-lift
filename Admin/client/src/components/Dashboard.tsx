import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardAPI } from '../services/api';
import { DashboardStats, UserWithTransactions, PickupRequest } from '../types';
import { 
  Users, 
  Package, 
  CheckCircle, 
  Clock, 
  MapPin, 
  LogOut,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';
import UsersTable from './UsersTable';
import MapView from './MapView';
import RecentRequests from './RecentRequests';

const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<UserWithTransactions[]>([]);
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'map'>('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, requestsData] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getUsers(),
        dashboardAPI.getPickupRequests()
      ]);
      
      setStats(statsData);
      setUsers(usersData);
      setPickupRequests(requestsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserFilterChange = async (filterType: string) => {
    try {
      const filteredUsers = await dashboardAPI.getUsers(filterType);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error filtering users:', error);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
  }> = ({ title, value, icon, color, bgColor }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">EcoLift Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'map', label: 'Map', icon: MapPin }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Requests"
                  value={stats.totalRequests}
                  icon={<Package className="h-6 w-6 text-white" />}
                  color="border-blue-500"
                  bgColor="bg-blue-500"
                />
                <StatCard
                  title="Accepted"
                  value={stats.acceptedRequests}
                  icon={<CheckCircle className="h-6 w-6 text-white" />}
                  color="border-green-500"
                  bgColor="bg-green-500"
                />
                <StatCard
                  title="In Progress"
                  value={stats.inProgressRequests}
                  icon={<Clock className="h-6 w-6 text-white" />}
                  color="border-yellow-500"
                  bgColor="bg-yellow-500"
                />
                <StatCard
                  title="Completed"
                  value={stats.completedRequests}
                  icon={<CheckCircle className="h-6 w-6 text-white" />}
                  color="border-green-600"
                  bgColor="bg-green-600"
                />
              </div>
            )}

            {/* User Statistics */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  icon={<Users className="h-6 w-6 text-white" />}
                  color="border-purple-500"
                  bgColor="bg-purple-500"
                />
                <StatCard
                  title="Collectors"
                  value={stats.totalCollectors}
                  icon={<UserCheck className="h-6 w-6 text-white" />}
                  color="border-indigo-500"
                  bgColor="bg-indigo-500"
                />
                <StatCard
                  title="Customers"
                  value={stats.totalCustomers}
                  icon={<UserX className="h-6 w-6 text-white" />}
                  color="border-pink-500"
                  bgColor="bg-pink-500"
                />
              </div>
            )}

            {/* Recent Requests */}
            <RecentRequests />
          </div>
        )}

        {activeTab === 'users' && (
          <UsersTable 
            users={users} 
            onFilterChange={handleUserFilterChange}
          />
        )}

        {activeTab === 'map' && (
          <MapView pickupRequests={pickupRequests} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
