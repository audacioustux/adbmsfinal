<template>
  <table class="table-auto border-collapse border border-gray-100 my-4 w-full">
    <thead>
      <tr>
        <th
          v-for="column in result.metaData"
          :key="column.name"
          class="border border-gray-100"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in result.rows" :key="index">
        <td v-for="(val, key) in row" :key="key" class="border border-gray-100">
          {{ val }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  data() {
    return { result: {} };
  },
  watch: {
    $route: "fetchResult",
  },
  created() {
    this.fetchResult();
  },
  methods: {
    async fetchResult() {
      try {
        const url = `http://localhost:4000/api/query`;
        const response = await axios.post(url, {
          sql: `select * from
              ${this.$route.params.tablename}`,
        });
        this.result = response.data;
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("Server Error:", err);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("Network Error:", err);
        } else {
          console.log("Client Error:", err);
        }
      }
    },
  },
});
</script>
