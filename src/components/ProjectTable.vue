<template>
  <div>
    <b-modal ref="editModal" hide-footer title="Edit Project" show-empty>
      <form ref="form">
        <b-form-group
          label="Name"
          label-for="projectName"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="projectName"
            v-model="projectForm.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Decription"
          label-for="projectDescription"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="projectDescription"
            v-model="projectForm.description"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-select
          v-model="projectForm.selectedEmployee"
          :options="projectForm.employeeList"
          value-field="empid"
          text-field="name"
          multiple
          :select-size="4"
        ></b-form-select>
        <!-- <b-form-tags
          class="disableInput"
          input-id="tags-basic"
          v-model="projectForm.employeeList"
          no-add-on-enter
        ></b-form-tags> -->
        <div class="pt-2">
          <b-button variant="info" @click="editSubmit">Submit</b-button>
        </div>
      </form>
    </b-modal>

    <b-table
      :fields="projectValues"
      v-if="projectDetails !== null"
      :items="Object.values(projectDetails)"
      responsive
      show-empty
    >
      <template #empty>
        <h4 class="font-14">No project found.</h4>
      </template>
      <template #cell(name)="data">
        <b class="text-info">{{ data.value }}</b>
      </template>
      <template #cell(editProject)="data">
        <b-button
          variant="warning"
          size="sm"
          title="Edit Project"
          class="cursor-pointer"
          @click="openEdit($event, data.index)"
          ><b-icon-pencil-square
        /></b-button>
      </template>
      <template #cell(removeProject)="data">
        <b-button
          variant="danger"
          size="sm"
          title="Remove project"
          class="cursor-pointer"
          @click="removeProject($event, data.item.id)"
          ><b-icon-trash
        /></b-button>
      </template>
    </b-table>
    <!-- <b-table :items="Object.values(projectDetails)"></b-table> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ProjectTable",
  props: [
    "projectDetails",
    "employeeDetails",
    "submitEditProject",
    "removeSingleProject",
  ],
  data: function () {
    return {
      projectValues: [
        "id",
        "name",
        "description",
        "startdate",
        "editProject",
        "removeProject",
      ],
      projectForm: {
        id: "",
        name: "",
        description: "",
        selectedEmployee: [],
        employeeList: [],
      },
    };
  },
  methods: {
    ...mapActions(["editProject"]),
    openEdit(event, index) {
      // console.log(id);
      let { name, description, employees, id } = this.projectDetails[index];
      this.projectForm.employeeList = Object.values(this.employeeDetails);
      console.log(id);
      this.projectForm.id = id;
      this.projectForm.name = name;
      this.projectForm.description = description;
      // this.projectForm.employeeList = employeeList;
      this.projectForm.selectedEmployee = employees;
      this.$refs["editModal"].show();
    },
    removeProject(event, id) {
      this.removeSingleProject({ id });
    },
    editSubmit() {
      this.submitEditProject(this.projectForm, this.$refs["editModal"]);
    },
  },
};
</script>

<style></style>
