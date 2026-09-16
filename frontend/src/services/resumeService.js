import api from './api';

export const resumeService = {
  // Upload PDF resume and fetch AI structured analysis
  analyzeResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Perform AI Skill Gap Analysis comparing resume skills with target job role
  analyzeSkillGap: async (targetRole, resumeSkills) => {
    const response = await api.post('/skills/analyze', { targetRole, resumeSkills });
    return response.data;
  }
};
