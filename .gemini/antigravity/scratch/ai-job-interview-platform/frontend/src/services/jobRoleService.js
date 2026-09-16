import api from './api';

export const jobRoleService = {
  // Fetch available job roles list
  getJobRoles: async () => {
    const response = await api.get('/job-roles');
    return response.data;
  },

  // Calculate profile skill match & interview performance for selected job role
  matchJobRole: async (roleId) => {
    const response = await api.post('/job-roles/match', { roleId });
    return response.data;
  }
};
