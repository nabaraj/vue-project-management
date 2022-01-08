<template>
  <div>
    <Header :employeeDetails="employeeDetails" />
    <b-container>
      <h3 class="font-18 pb-3 pt-4">Project List</h3>
      <b-overlay :show="projectLoader" rounded="sm">
        <ProjectTable
          :projectDetails="projectDetails"
          :employeeDetails="employeeDetails"
          :submitEditProject="submitEditProject"
          :removeSingleProject="removeSingleProject"
        />
      </b-overlay>
      <h3 class="font-18 pt-5 pb-3">Employee List</h3>
      <b-overlay :show="employeeLoader" rounded="sm">
        <EmployeeTable :employeeDetails="employeeDetails" />
      </b-overlay>
    </b-container>
  </div>
</template>

<script>
import ProjectTable from "../components/ProjectTable.vue";
import { mapState, mapActions } from "vuex";
import EmployeeTable from "../components/EmployeeTable.vue";
import Header from "../components/Header.vue";
export default {
  components: { ProjectTable, EmployeeTable, Header },
  name: "Home",
  computed: {
    ...mapState({
      projectDetails: (state) => state.projectDetails,
      projectLoader: (state) => state.projectLoader,
      employeeLoader: (state) => state.employeeLoader,
      employeeDetails: (state) => state.employeeDetails,
    }),
  },
  created: function () {
    this.getProjectDetails();
    this.getEmployeeDetails();
  },
  methods: {
    ...mapActions(["getProjectDetails", "getEmployeeDetails"]),
    getProjectDetails: function () {
      this.$store.dispatch("getProjectDetails");
    },
    getEmployeeDetails: function () {
      this.$store.dispatch("getEmployeeDetails");
    },
    submitEditProject(editFormData, modalRef) {
      let { id, name, description, selectedEmployee: employees } = editFormData;
      this.$store
        .dispatch("editProject", {
          id,
          name,
          description,
          employees,
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("getProjectDetails");
        });
      modalRef.hide();
    },
    removeSingleProject(id) {
      this.$store
        .dispatch("removeSingleProject", id)
        .then(() => this.$store.dispatch("getProjectDetails"));
    },
  },
};
</script>

<style></style>
