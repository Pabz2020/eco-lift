import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../services/notification_service.dart';
import '../services/customer_notification_service.dart';

class AuthSplashScreen extends StatefulWidget {
  const AuthSplashScreen({super.key});

  @override
  State<AuthSplashScreen> createState() => _AuthSplashScreenState();
}

class _AuthSplashScreenState extends State<AuthSplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _textController;
  late Animation<double> _logoAnimation;
  late Animation<Offset> _textOffsetAnimation;
  late Animation<double> _textFadeAnimation;

  @override
  void initState() {
    super.initState();
    _logoController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _textController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _logoAnimation = CurvedAnimation(
      parent: _logoController,
      curve: Curves.easeOutBack,
    );
    _textOffsetAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _textController,
      curve: Curves.easeOut,
    ));
    _textFadeAnimation = CurvedAnimation(
      parent: _textController,
      curve: Curves.easeIn,
    );

    _startAnimations();
    _checkAuthState();
  }

  void _startAnimations() {
    _logoController.forward();
    Future.delayed(const Duration(milliseconds: 400), () {
      _textController.forward();
    });
  }

  Future<void> _checkAuthState() async {
    try {
      // Wait for animations to complete
      await Future.delayed(const Duration(milliseconds: 2000));

      if (!mounted) return;

      final authState = await AuthService.checkAuthState();

      if (!mounted) return;

      if (authState['isAuthenticated']) {
        // User is authenticated, initialize notification services based on user type
        final userType = authState['userType'];
        final userData = authState['userData'];

        // Initialize notification services based on user type
        if (userType == 'customer') {
          await CustomerNotificationService.initialize();
          await CustomerNotificationService.loadStoredNotifications();
          await CustomerNotificationService.setupFirebaseMessaging();
        } else if (userType == 'collector') {
          await NotificationService.initialize();
          await NotificationService.loadStoredNotifications();
          await NotificationService.setupFirebaseMessaging();
        }

        if (!mounted) return;

        if (userType == 'customer') {
          Navigator.pushReplacementNamed(
            context,
            '/customer_dashboard',
            arguments: userData,
          );
        } else if (userType == 'collector') {
          Navigator.pushReplacementNamed(
            context,
            '/collector_dashboard',
            arguments: userData,
          );
        } else {
          // Unknown user type, go to welcome page
          Navigator.pushReplacementNamed(context, '/welcome');
        }
      } else {
        // User is not authenticated, go to welcome page
        Navigator.pushReplacementNamed(context, '/welcome');
      }
    } catch (e) {
      // On any error, go to welcome page
      if (mounted) {
        Navigator.pushReplacementNamed(context, '/welcome');
      }
    }
  }

  @override
  void dispose() {
    _logoController.dispose();
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFA8E063), Color(0xFF56AB2F)],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ScaleTransition(
                scale: _logoAnimation,
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.green.withValues(alpha: 0.15),
                        blurRadius: 30,
                        spreadRadius: 5,
                      ),
                    ],
                  ),
                  padding: const EdgeInsets.all(32),
                  child: Image.asset(
                    'assets/images/splash.png',
                    width: 64,
                    height: 64,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              SlideTransition(
                position: _textOffsetAnimation,
                child: FadeTransition(
                  opacity: _textFadeAnimation,
                  child: const Column(
                    children: [
                      Text(
                        'ECO LIFT',
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          letterSpacing: 1.2,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        'Waste to Wonders',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.white70,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 48),
              FadeTransition(
                opacity: _textFadeAnimation,
                child: const CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
