export const authSelector = {
  id: true,
  email: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  learnerId: true,
  instructorId: true,
  instructor: {
    id: true,
    rating: true,
    isVerified: true,
  },
  learner: {
    id: true,
    roi: true,
    score: true,
  },
  isActive: true,
  role: {
    id: true,
    title: true,
  },
};
