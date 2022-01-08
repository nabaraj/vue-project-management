import Vue from "vue";
import Vuex from "vuex";
import { requestApi } from "./../utils/service";
import { apiPath } from "./../utils/utility";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projectDetails: null,
    employeeDetails: null,
    projectLoader: false,
    employeeLoader: false,
  },
  mutations: {
    updateProject(state, responseData) {
      state.projectDetails = responseData;
    },
    updateEmployee(state, responseData) {
      state.employeeDetails = responseData;
    },
    updateProjectLoader(state, isLoading) {
      state.projectLoader = isLoading;
    },
    updateEmployeeLoader(state, isLoading) {
      state.employeeLoader = isLoading;
    },
  },
  actions: {
    getProjectDetails({ commit }) {
      return new Promise((resolve, reject) => {
        commit("updateProjectLoader", true);
        const url = `${apiPath}/projects/`;
        const requestObject = {
          url,
          method: "GET",
        };
        requestApi(requestObject)
          .then((res) => {
            commit("updateProject", res.data);
            commit("updateProjectLoader", false);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("err ", err);
            commit("updateProjectLoader", true);
            reject(err);
          });
      });
    },
    getEmployeeDetails({ commit }) {
      return new Promise((resolve, reject) => {
        commit("updateEmployeeLoader", true);
        const url = `${apiPath}/employee/`;
        const requestObject = {
          url,
          method: "GET",
        };
        requestApi(requestObject)
          .then((res) => {
            commit("updateEmployee", res.data);
            commit("updateEmployeeLoader", false);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("err ", err);
            commit("updateEmployeeLoader", false);
            reject(err);
          });
      });
    },
    submitProject({ commit }, formData) {
      console.log(commit);
      return new Promise((resolve, reject) => {
        commit("updateProjectLoader", true);
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
        commit("updateEmployeeLoader", true);
        const url = `${apiPath}/employee/add`;
        const submitProjectObject = {
          url,
          method: "POST",
          data: formData,
        };
        requestApi(submitProjectObject)
          .then((res) => {
            // commit("updateEmployee", res.data);
            commit("updateEmployeeLoader", false);
            resolve(res.data);
          })
          .catch((err) => {
            // console.log("err ", err);
            commit("updateEmployeeLoader", false);
            reject(err);
          });
      });
    },
    editProject({ commit }, formData) {
      return new Promise((resolve, reject) => {
        commit("updateProjectLoader", true);
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
    removeSingleProject({ commit }, formData) {
      return new Promise((resolve, reject) => {
        commit("updateProjectLoader", true);
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
