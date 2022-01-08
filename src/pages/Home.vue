<template>
  <div>
    <Header :employeeDetails="employeeDetails" />
    <b-container>
      <h3>Project List</h3>
      <ProjectTable
        :projectDetails="projectDetails"
        :employeeDetails="employeeDetails"
        :submitEditProject="submitEditProject"
        :removeSingleProject="removeSingleProject"
      />
      <h3>Employee List</h3>
      <EmployeeTable :employeeDetails="employeeDetails" />
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
