import { Router } from 'express';
import todoRoutes from './todo.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Todo routes
router.use('/todos', todoRoutes);

export default router;