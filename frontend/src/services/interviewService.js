import api from './api';

export const interviewService = {
  // Generate a technical interview question from Spring Boot AI API
  generateQuestion: async (topic, difficulty) => {
    const response = await api.post('/interview/generate', { topic, difficulty });
    return response.data;
  },

  // Evaluate candidate's written answer & save to MySQL database via Spring Boot
  evaluateAnswer: async (question, answer, topic, difficulty) => {
    const response = await api.post('/interview/evaluate', { question, answer, topic, difficulty });
    return response.data;
  },

  // Fetch logged in user's complete interview history
  getHistory: async () => {
    const response = await api.get('/interview/history');
    return response.data;
  },

  // Fetch single interview attempt detail by ID (Strictly user-isolated)
  getInterviewById: async (id) => {
    const response = await api.get(`/interview/${id}`);
    return response.data;
  },

  // Fetch real-time dashboard summary
  getDashboardStats: async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  }
};
