import api from './api';

export const dashboardService = {
  // Fetch real-time integrated dashboard summary from Spring Boot
  getSummary: async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  }
};
