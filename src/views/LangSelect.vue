<template>
    <form>
      <div class="multiselect">
        <div class="selectBox" @click="expanded = !expanded">
          <select v-model="selectedOption">
            <option disabled value="">Select an option</option>
            <!-- Add your other options here -->
          </select>
          <div class="overSelect"></div>
        </div>
        <div :class="{ 'show': expanded }" id="checkboxes">
          <label v-for="(option, index) in options" :key="index" :for="`checkbox-${index}`">
            <input
              type="checkbox"
              :id="`checkbox-${index}`"
              v-model="selectedOptions"
              :value="option"
            />
            {{ option }}
          </label>
        </div>
      </div>
    
    </form>
  </template>
  
  <script>
  export default {
    name : "VueLangSelect",
    data() {
      return {
        expanded: false,
        options: ['First checkbox', 'Second checkbox', 'Third checkbox'],
        selectedOption: '',
        selectedOptions: [],
      };
    },
  };
  </script>
  
  <style scoped>
  .multiselect {
    width: 200px;
  }
  
  .selectBox {
    position: relative;
  }
  
  .selectBox select {
    width: 100%;
    font-weight: bold;
  }
  
  .overSelect {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  
  #checkboxes {
    display: none;
    border: 1px #dadada solid;
  }
  
  #checkboxes.show {
    display: block;
  }
  
  #checkboxes label {
    display: block;
    padding: 8px;
    cursor: pointer;
  }
  
  #checkboxes label:hover {
    background-color: #1e90ff;
  }
  </style>
  