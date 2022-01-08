<template>
  <b-table
    v-if="employeeDetails !== null"
    :items="Object.values(employeeDetails)"
    responsive
    show-empty
  >
    <template #empty>
      <h4 class="font-14">Need to add employee</h4>
    </template>
  </b-table>
</template>

<script>
export default {
  name: "EmployeeTable",
  props: ["employeeDetails"],
};
</script>

<style></style>
