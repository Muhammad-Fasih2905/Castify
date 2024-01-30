import axios from 'axios';
import {appConfig} from '../config';
const API = axios.create({
  baseURL: appConfig.BASE_URL,
});
// ------------------ *** NOTIFICATION *** ------------------
// Get Job
function getAllJobs(action) {
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.get(`/jobs/job/`, {headers});
}

// Get Job BY ID
function getJobById(action) {
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.get(`/jobs/job/${action.id}/`, {headers});
}
// Get Create Job
function createJob(action) {
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.post(`/jobs/job/`, action?.data, {
    headers,
  });
}
// Get Applied Job
function getAppliedJob(action) {
  console.log(action.token, 'action.token');
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.get(`/jobs/applyJob/`, {
    headers,
  });
}
// Post Applied Job
function postAppliedJob(action) {
  console.log(action.token, 'services===============>');
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.post(`jobs/applyJob/`, action?.data, {
    headers,
  });
}

// Approved Job
function approvedJob(action) {
  console.log(action.token, 'services===============>');
  const headers = {Authorization: `Bearer ${action.token}`};
  return API.post(`jobs/approveJob/`, action?.data, {
    headers,
  });
}
export const jobServices = {
  getAllJobs,
  approvedJob,
  getJobById,
  createJob,
  getAppliedJob,
  postAppliedJob,
};
