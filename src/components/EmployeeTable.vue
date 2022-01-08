<template>
  <b-table
    v-if="employeeDetails !== null"
    :items="Object.values(employeeDetails)"
    responsive
  >
  </b-table>
</template>

<script>
export default {
  name: "EmployeeTable",
  props: ["employeeDetails"],
};
</script>

<style></style>
