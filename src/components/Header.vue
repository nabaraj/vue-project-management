<template>
  <div>
    <b-modal ref="edit" hide-footer :title="modalTitle">
      <form v-if="addFormMode === 'addProject'">
        <b-form-group label="Name" label-for="projectName">
          <b-form-input
            id="projectName"
            v-model="project.name"
            required
            placeholder="Enter project name"
            :class="[project.nameError ? 'is-invalid' : '']"
          ></b-form-input>
          <b-form-invalid-feedback v-if="project.nameError">
            Not valid project name
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-datepicker
          id="startDate"
          v-model="project.startDate"
          class="mb-2"
        ></b-form-datepicker>
        <b-form-group
          label="Decription"
          label-for="projectDescription"
          class="hasError"
        >
          <b-form-textarea
            id="projectDescription"
            v-model="project.description"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            style="overflow: auto"
            :class="[project.descriptionError ? 'is-invalid' : '']"
          ></b-form-textarea>
          <b-form-invalid-feedback v-if="project.descriptionError">
            Not valid project description
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-select
            v-model="project.employees"
            :options="Object.values(employeeDetails)"
            multiple
            value-field="empid"
            text-field="name"
            size="sm"
            class="mt-3"
          ></b-form-select>
        </b-form-group>
        <b-button @click="addProjectSubmit" variant="info">Submit</b-button>
      </form>
      <form
        v-if="addFormMode === 'addEmployee'"
        @submit.stop.prevent="handleSubmit"
      >
        <b-form-group
          label="Name"
          label-for="employeeName"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="employeeName"
            v-model="employee.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-button @click="addEmployeeSubmit" variant="info">Submit</b-button>
      </form>
    </b-modal>
    <b-navbar toggleable="lg" type="dark" variant="info" sticky>
      <b-navbar-brand href="#">Project Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content> Add <b-icon-file-plus /> </template>
            <b-dropdown-item href="#" @click="changeFormMode('addProject')"
              >Add Project</b-dropdown-item
            >
            <b-dropdown-item href="#" @click="changeFormMode('addEmployee')"
              >Add Employee</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  props: ["employeeDetails"],
  data: function () {
    return {
      addFormMode: "",
      modalTitle: "",
      project: {
        name: "",
        nameError: false,
        startDate: null,
        description: "",
        descriptionError: false,
        employees: [],
      },
      employee: {
        name: "",
        nameError: false,
      },
    };
  },
  methods: {
    ...mapActions(["submitProject", "getProjectDetails"]),
    changeFormMode: function (mode) {
      this.addFormMode = mode;
      if (mode === "addProject") {
        this.modalTitle = "Add Project";
      } else if (mode === "addEmployee") {
        this.modalTitle = "Add Employee";
      } else {
        this.modalTitle = "";
      }
      this.$refs["edit"].show();
    },
    addProjectSubmit: function () {
      if (this.project.name === "" || this.project.name.trim().length < 3) {
        this.project.nameError = true;
      } else {
        this.project.nameError = false;
      }
      if (
        this.project.description === "" ||
        this.project.description.trim().length < 50 ||
        this.project.description.trim().length > 300
      ) {
        this.project.descriptionError = true;
      } else {
        this.project.descriptionError = false;
      }
      if (!this.project.descriptionError && !this.project.nameError) {
        console.log("submit");
        let startDate = this.project.startDate
          ? new Date(this.project.startDate)
          : new Date();
        this.$store
          .dispatch("submitProject", {
            name: this.project.name,
            description: this.project.description,
            startdate: startDate.toISOString().split("T")[0],
            employees: this.project.employees,
          })
          .then(() => {
            this.$store.dispatch("getProjectDetails");
            this.resetAddForm();
          });
      }
    },
    addEmployeeSubmit: function () {
      if (this.employee.name === "" || this.employee.name.trim().length < 3) {
        this.employee.nameError = true;
      } else {
        this.employee.nameError = false;
      }

      if (!this.employee.nameError) {
        console.log("submit");
        this.$store
          .dispatch("submitEmployee", {
            name: this.employee.name,
          })
          .then(() => {
            this.$store.dispatch("getEmployeeDetails");
            this.resetAddForm();
          });
      }
    },
    resetAddForm: function () {
      this.$refs["edit"].hide();
      this.project.name = "";
      this.project.description = "";
      this.project.employees = [];
      this.employee.name = "";
    },
  },
};
</script>

<style></style>
