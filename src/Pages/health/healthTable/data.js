import React from "react";
const columns = [
  {name:"Title",uid:"title",sortable:true},
  {name:"Date/Time",uid:"date",sortable:true},
  {name:"DUE Date/Time",uid:"duedate",sortable:true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export {columns, statusOptions};
