import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class CollectorProfile extends StatelessWidget {
  final Map<String, dynamic>? userData;

  const CollectorProfile({super.key, this.userData});

  @override
  Widget build(BuildContext context) {
    String name = userData?['fullName'] ?? 'Collector';
    String email = userData?['email'] ?? 'No email provided';
    String phone = userData?['phone'] ?? 'No phone provided';
    String nic = userData?['nicNumber'] ?? 'Not provided';

    // Vehicle info
    Map<String, dynamic>? vehicle = userData?['vehicleInfo'];
    String vehicleType = vehicle?['type'] ?? 'Unknown';
    String vehicleNumber = vehicle?['number'] ?? 'Unknown';
    String vehicleCapacity = vehicle?['capacity']?.toString() ?? 'Unknown';

    // Waste types
    List<dynamic> wasteTypes = userData?['wasteTypes'] ?? [];

    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            // Profile Picture & Name
            Column(
              children: [
                const CircleAvatar(
                  radius: 60,
                  backgroundImage: AssetImage('assets/images/ecolift_logo.png'),
                  backgroundColor: Colors.transparent,
                ),
                const SizedBox(height: 16),
                Text(
                  name,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Waste Collector',
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 16,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 32),

            // Contact Info
            _buildSectionTitle('Personal Information'),
            const SizedBox(height: 12),
            _buildInfoRow(Icons.person, 'NIC Number', nic),
            _buildInfoRow(Icons.email, 'Email', email),
            _buildInfoRow(Icons.phone, 'Phone', phone),

            const SizedBox(height: 32),

            // Vehicle Info
            _buildSectionTitle('Vehicle Information'),
            const SizedBox(height: 12),
            _buildInfoRow(Icons.local_shipping, 'Vehicle Type', vehicleType),
            _buildInfoRow(
                Icons.confirmation_number, 'Vehicle Number', vehicleNumber),
            _buildInfoRow(Icons.scale, 'Capacity', '$vehicleCapacity kg'),

            const SizedBox(height: 32),

            // Waste Types
            _buildSectionTitle('Collected Waste Types'),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: wasteTypes.map((type) {
                return Chip(
                  label: Text(type.toString()),
                  backgroundColor: Colors.green.shade100,
                  labelStyle: const TextStyle(color: Colors.black),
                );
              }).toList(),
            ),

            const SizedBox(height: 40),

            // Logout Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => _showLogoutDialog(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.logout),
                    SizedBox(width: 8),
                    Text(
                      'Logout',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: const Row(
            children: [
              Icon(Icons.logout, color: Colors.red),
              SizedBox(width: 8),
              Text('Logout'),
            ],
          ),
          content: const Text(
            'Are you sure you want to logout from your account?',
            style: TextStyle(fontSize: 16),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text(
                'Cancel',
                style: TextStyle(color: Colors.grey),
              ),
            ),
            ElevatedButton(
              onPressed: () async {
                Navigator.of(context).pop();
                // Clear user data using AuthService
                await AuthService.clearUserData();
                if (context.mounted) {
                  // Navigate to welcome page
                  Navigator.of(context).pushNamedAndRemoveUntil(
                    '/welcome',
                    (route) => false,
                  );
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
              ),
              child: const Text('Logout'),
            ),
          ],
        );
      },
    );
  }

  Widget _buildSectionTitle(String title) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Icon(icon, color: Colors.green.shade700),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 12,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
