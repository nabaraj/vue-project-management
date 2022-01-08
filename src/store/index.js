import Vue from "vue";
import Vuex from "vuex";
import { requestApi } from "./../utils/service";
import { apiPath } from "./../utils/utility";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projectDetails: null,
    employeeDetails: null,
  },
  mutations: {
    updateProject(state, responseData) {
      state.projectDetails = responseData;
    },
    updateEmployee(state, responseData) {
      state.employeeDetails = responseData;
    },
  },
  actions: {
    getProjectDetails({ commit }) {
      return new Promise((resolve, reject) => {
        const url = `${apiPath}/projects/`;
        const requestObject = {
          url,
          method: "GET",
        };
        requestApi(requestObject)
          .then((res) => {
            commit("updateProject", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("err ", err);
            reject(err);
          });
      });
    },
    getEmployeeDetails({ commit }) {
      return new Promise((resolve, reject) => {
        const url = `${apiPath}/employee/`;
        const requestObject = {
          url,
          method: "GET",
        };
        requestApi(requestObject)
          .then((res) => {
            commit("updateEmployee", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("err ", err);
            reject(err);
          });
      });
    },
    submitProject({ commit }, formData) {
      console.log(commit);
      return new Promise((resolve, reject) => {
        const url = `${apiPath}/projects/add`;
        const submitProjectObject = {
          url,
          method: "POST",
          data: formData,
        };
        requestApi(submitProjectObject)
          .then((res) => {
            // commit("updateEmployee", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            // console.log("err ", err);
            reject(err);
          });
      });
    },
    submitEmployee({ commit }, formData) {
      console.log(commit);
      return new Promise((resolve, reject) => {
        const url = `${apiPath}/employee/add`;
        const submitProjectObject = {
          url,
          method: "POST",
          data: formData,
        };
        requestApi(submitProjectObject)
          .then((res) => {
            // commit("updateEmployee", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            // console.log("err ", err);
            reject(err);
          });
      });
    },
    editProject({ commit }, formData) {
      console.log(commit);
      return new Promise((resolve, reject) => {
        const url = `${apiPath}/projects/update`;
        const submitProjectObject = {
          url,
          method: "PUT",
          data: formData,
        };
        requestApi(submitProjectObject)
          .then((res) => {
            // commit("updateEmployee", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            // console.log("err ", err);
            reject(err);
          });
      });
    },
    removeSingleProject({ ...actionObj }, formData) {
      // console.log(commit);
      return new Promise((resolve, reject) => {
        const url = `${apiPath}/projects/removepost`;
        const submitProjectObject = {
          url,
          method: "DELETE",
          data: formData,
        };
        requestApi(submitProjectObject)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            // console.log("err ", err);
            reject(err);
          });
      });
    },
  },
  modules: {},
});
