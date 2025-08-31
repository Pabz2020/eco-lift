import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { PickupRequest, MapFilter } from '../types';
import { MapPin, Filter, Eye, EyeOff } from 'lucide-react';

interface MapViewProps {
  pickupRequests: PickupRequest[];
}

const MapView: React.FC<MapViewProps> = ({ pickupRequests }) => {
  const [mapFilter, setMapFilter] = useState<MapFilter>({
    showLocations: true,
    showCollectorLocations: true,
    filterType: 'All'
  });

  const [mapCenter, setMapCenter] = useState<[number, number]>([6.9271, 79.8612]); // Default to Sri Lanka

  useEffect(() => {
    // Calculate center based on available data
    if (pickupRequests?.length > 0) {
      const validLocations = pickupRequests.filter(req => 
        req.location.coordinates[0] !== 0 && req.location.coordinates[1] !== 0
      );
      
      if (validLocations?.length > 0) {
        const avgLat = validLocations.reduce((sum, req) => sum + req.location.coordinates[1], 0) / validLocations.length;
        const avgLng = validLocations.reduce((sum, req) => sum + req.location.coordinates[0], 0) / validLocations.length;
        setMapCenter([avgLat, avgLng]);
      }
    }
  }, [pickupRequests]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return '#10B981'; // green
      case 'In Progress':
        return '#F59E0B'; // yellow
      case 'Completed':
        return '#3B82F6'; // blue
      default:
        return '#6B7280'; // gray
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return '🟢';
      case 'In Progress':
        return '🟡';
      case 'Completed':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const filteredRequests = pickupRequests.filter(request => {
    if (mapFilter.filterType === 'Locations') {
      return mapFilter.showLocations;
    } else if (mapFilter.filterType === 'CollectorLocations') {
      return mapFilter.showCollectorLocations;
    }
    return true;
  });

  return (
    <div className="bg-white shadow-md rounded-lg">
      {/* Header with Controls */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900">Pickup Locations Map</h2>
            <span className="text-sm text-gray-500">({filteredRequests?.length} locations)</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Filter Type */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={mapFilter.filterType}
                onChange={(e) => setMapFilter(prev => ({ 
                  ...prev, 
                  filterType: e.target.value as MapFilter['filterType'] 
                }))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="All">All Locations</option>
                <option value="Locations">Customer Locations</option>
                <option value="CollectorLocations">Collector Locations</option>
              </select>
            </div>

            {/* Toggle Controls */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={mapFilter.showLocations}
                  onChange={(e) => setMapFilter(prev => ({ 
                    ...prev, 
                    showLocations: e.target.checked 
                  }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="flex items-center space-x-1">
                  {mapFilter.showLocations ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  <span>Customer Locations</span>
                </span>
              </label>

              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={mapFilter.showCollectorLocations}
                  onChange={(e) => setMapFilter(prev => ({ 
                    ...prev, 
                    showCollectorLocations: e.target.checked 
                  }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="flex items-center space-x-1">
                  {mapFilter.showCollectorLocations ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  <span>Collector Locations</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96 relative">
        <MapContainer
          center={mapCenter}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Customer Locations */}
          {mapFilter.showLocations && pickupRequests.map((request) => {
            const [lng, lat] = request.location.coordinates;
            if (lng === 0 && lat === 0) return null;

            return (
              <CircleMarker
                key={`customer-${request._id}`}
                center={[lat, lng]}
                radius={8}
                fillColor={getStatusColor(request.status)}
                color={getStatusColor(request.status)}
                weight={2}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {getStatusIcon(request.status)} Customer Location
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Customer:</strong> {request.customerId.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Status:</strong> {request.status}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Type:</strong> {request.requestType}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Items:</strong> {request.items?.length} types
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          {/* Collector Locations */}
          {mapFilter.showCollectorLocations && pickupRequests.map((request) => {
            if (!request.collectorId || !request.collectorLocation) return null;
            
            const [lng, lat] = request.collectorLocation.coordinates;
            if (lng === 0 && lat === 0) return null;

            return (
              <CircleMarker
                key={`collector-${request._id}`}
                center={[lat, lng]}
                radius={6}
                fillColor="#8B5CF6"
                color="#8B5CF6"
                weight={2}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      🟣 Collector Location
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Collector:</strong> {request.collectorId.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Status:</strong> {request.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Customer:</strong> {request.customerId.name}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-6 text-sm">
          <span className="font-medium text-gray-700">Legend:</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Accepted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Collector</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
