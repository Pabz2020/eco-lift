import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String baseUrl = 'http://3.6.88.253:4000';

  /// Check if user is authenticated and return user type
  static Future<Map<String, dynamic>> checkAuthState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final authToken = prefs.getString('auth_token');
      final userType = prefs.getString('user_type');
      final userDataString = prefs.getString('user_data');

      if (authToken == null || authToken.isEmpty) {
        return {
          'isAuthenticated': false,
          'userType': null,
          'userData': null,
        };
      }

      // If we have stored user data, use it (faster than API call)
      if (userDataString != null && userType != null) {
        try {
          final userData = jsonDecode(userDataString);
          return {
            'isAuthenticated': true,
            'userType': userType,
            'userData': userData,
          };
        } catch (e) {
          // If stored data is corrupted, clear it and check token
        }
      }

      // Validate token by making a simple API call
      // We'll use the profile endpoint which requires authentication
      final response = await http.get(
        Uri.parse('$baseUrl/api/users/profile'),
        headers: {
          'Authorization': 'Bearer $authToken',
          'Content-Type': 'application/json',
        },
      ).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        // Token is valid, get user data from stored preferences
        final userData =
            userDataString != null ? jsonDecode(userDataString) : null;
        return {
          'isAuthenticated': true,
          'userType': userType,
          'userData': userData,
        };
      } else {
        // Token is invalid, clear stored data
        await clearUserData();
        return {
          'isAuthenticated': false,
          'userType': null,
          'userData': null,
        };
      }
    } catch (e) {
      // On any error, assume not authenticated
      return {
        'isAuthenticated': false,
        'userType': null,
        'userData': null,
      };
    }
  }

  /// Store user data after successful login
  static Future<void> storeUserData(
      String token, Map<String, dynamic> userData) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
    await prefs.setString('user_type', userData['role']);
    await prefs.setString('user_data', jsonEncode(userData));
  }

  /// Clear user data on logout
  static Future<void> clearUserData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    await prefs.remove('user_type');
    await prefs.remove('user_data');
  }

  /// Get stored user data
  static Future<Map<String, dynamic>?> getStoredUserData() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userDataString = prefs.getString('user_data');
      if (userDataString != null) {
        return jsonDecode(userDataString);
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
