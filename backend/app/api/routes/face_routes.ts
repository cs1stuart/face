import { Router } from 'express';
import * as faceService from '../../services/face_service';

const router = Router();

router.post('/register-face', async (req, res) => {
  try {
    const { name, email, faceDescriptor } = req.body;
    if (!name || !email || !faceDescriptor) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await faceService.registerUser(name, email, faceDescriptor);
    res.status(201).json(user);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/verify-face', async (req, res) => {
  try {
    const { faceDescriptor } = req.body;
    if (!faceDescriptor) {
      return res.status(400).json({ error: 'Missing face descriptor' });
    }
    const user = await faceService.verifyFace(faceDescriptor);
    if (user) {
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } else {
      res.status(401).json({ success: false, error: 'Face not recognized' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await faceService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
