import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { UserService } from '../services/userService';
import { PickupRequestService } from '../services/pickupRequestService';
import { DashboardStats, UserWithTransactions } from '../types';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get dashboard statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [
      totalRequests,
      acceptedRequests,
      inProgressRequests,
      completedRequests,
      totalUsers,
      totalCollectors,
      totalCustomers
    ] = await Promise.all([
      PickupRequestService.countDocuments(),
      PickupRequestService.countDocuments({ status: 'Accepted' }),
      PickupRequestService.countDocuments({ status: 'In Progress' }),
      PickupRequestService.countDocuments({ status: 'Completed' }),
      UserService.countDocuments(),
      UserService.countDocuments({ role: 'collector' }),
      UserService.countDocuments({ role: 'customer' })
    ]);

    const stats: DashboardStats = {
      totalRequests,
      acceptedRequests,
      inProgressRequests,
      completedRequests,
      totalUsers,
      totalCollectors,
      totalCustomers
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get users with transaction counts
router.get('/users', async (req: Request, res: Response) => {
  try {
    const { filterType = 'All' } = req.query;
    
    let userFilter: any = {};
    if (filterType === 'Collectors') {
      userFilter.role = 'collector';
    } else if (filterType === 'Customers') {
      userFilter.role = 'customer';
    }

    const users = await UserService.find(userFilter, { password: 0, fcmToken: 0 });
    
    // Get transaction counts for each user
    const usersWithTransactions: UserWithTransactions[] = await Promise.all(
      users.map(async (user: any) => {
        let transactionCount = 0;
        
        if (user.role === 'customer') {
          // Count pickup requests for customers
          transactionCount = await PickupRequestService.countDocuments({ customerId: user._id });
        } else if (user.role === 'collector') {
          // Count pickup requests for collectors
          transactionCount = await PickupRequestService.countDocuments({ collectorId: user._id });
        }

        return {
          ...user,
          _id: user._id || '',
          totalTransactions: transactionCount
        };
      })
    );

    res.json(usersWithTransactions);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get pickup requests for map
router.get('/pickup-requests', async (req: Request, res: Response) => {
  try {
    const pickupRequests = await PickupRequestService.find({}, {
      location: 1,
      collectorLocation: 1,
      status: 1,
      customerId: 1,
      collectorId: 1,
      createdAt: 1
    });

    // Manually populate user data since models are in different connections
    const pickupRequestsWithUsers = await Promise.all(
      pickupRequests.map(async (request: any) => {
        const requestObj = request;
        
        // Fetch customer data
        if (requestObj.customerId) {
          const customer = await UserService.findById(requestObj.customerId, { name: 1, email: 1 });
          requestObj.customer = customer;
        }
        
        // Fetch collector data
        if (requestObj.collectorId) {
          const collector = await UserService.findById(requestObj.collectorId, { name: 1, email: 1 });
          requestObj.collector = collector;
        }
        
        return requestObj;
      })
    );

    res.json(pickupRequestsWithUsers);
  } catch (error) {
    console.error('Error fetching pickup requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get recent pickup requests
router.get('/recent-requests', async (req: Request, res: Response) => {
  try {
    const recentRequests = await PickupRequestService.find({}, {}, { sort: { createdAt: -1 }, limit: 10 });

    // Manually populate user data since models are in different connections
    const recentRequestsWithUsers = await Promise.all(
      recentRequests.map(async (request: any) => {
        const requestObj = request;
        
        // Fetch customer data
        if (requestObj.customerId) {
          const customer = await UserService.findById(requestObj.customerId, { name: 1, email: 1 });
          requestObj.customer = customer;
        }
        
        // Fetch collector data
        if (requestObj.collectorId) {
          const collector = await UserService.findById(requestObj.collectorId, { name: 1, email: 1 });
          requestObj.collector = collector;
        }
        
        return requestObj;
      })
    );

    res.json(recentRequestsWithUsers);
  } catch (error) {
    console.error('Error fetching recent requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
