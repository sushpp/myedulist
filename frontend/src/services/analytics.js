import api from './api';

export const analyticsAPI = {
  getPlatform: (timeRange = 'monthly') => 
    api.get(`/analytics/platform?range=${timeRange}`),
  
  getInstitute: (instituteId) => 
    api.get(`/analytics/institute/${instituteId}`)
};