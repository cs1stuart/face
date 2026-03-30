import { users, User } from '../db/memory_db';
import { v4 as uuidv4 } from 'uuid';

export const registerUser = async (name: string, email: string, faceDescriptor: number[]): Promise<User> => {
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    faceDescriptor,
  };
  users.push(newUser);
  return newUser;
};

export const verifyFace = async (faceDescriptor: number[]): Promise<User | null> => {
  if (users.length === 0) return null;

  let bestMatch: User | null = null;
  let minDistance = 0.6; // Threshold for face recognition

  for (const user of users) {
    const distance = euclideanDistance(faceDescriptor, user.faceDescriptor);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = user;
    }
  }

  return bestMatch;
};

export const getAllUsers = async (): Promise<User[]> => {
  return users.map(({ id, name, email }) => ({ id, name, email, faceDescriptor: [] }));
};

// Helper function to calculate distance between two descriptors
function euclideanDistance(v1: number[], v2: number[]): number {
  return Math.sqrt(v1.reduce((sum, val, i) => sum + Math.pow(val - v2[i], 2), 0));
}
