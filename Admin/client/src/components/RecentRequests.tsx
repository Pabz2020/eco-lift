import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { PickupRequest } from '../types';
import { Clock, Package, User, MapPin } from 'lucide-react';

const RecentRequests: React.FC = () => {
  const [recentRequests, setRecentRequests] = useState<PickupRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const fetchRecentRequests = async () => {
    try {
      setLoading(true);
      const requests = await dashboardAPI.getRecentRequests();
      setRecentRequests(requests);
    } catch (error) {
      console.error('Error fetching recent requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'Accepted':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'In Progress':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900">Recent Pickup Requests</h2>
          <span className="text-sm text-gray-500">({recentRequests.length} requests)</span>
        </div>
      </div>

      <div className="overflow-hidden">
        {recentRequests.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recent requests</h3>
            <p className="mt-1 text-sm text-gray-500">
              New pickup requests will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentRequests.map((request) => (
              <div key={request._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {request.customerId.name}
                        </span>
                        <span className={getStatusBadge(request.status)}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{request.customerId.email}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{request.requestType}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4" />
                          <span>{request.items.length} items</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {formatDate(request.createdAt)}
                    </div>
                    {request.collectorId && (
                      <div className="text-xs text-gray-400 mt-1">
                        Collector: {request.collectorId.name}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Items Summary */}
                {request.items.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {request.items.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                        >
                          {item.type} ({item.quantity})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRequests;
