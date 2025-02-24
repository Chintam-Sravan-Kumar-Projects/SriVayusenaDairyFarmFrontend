import React from "react";
const columns = [
  {name:"Date/Time",uid:"date",sortable:true},
  {name: "Expense Name", uid: "expense",sortable:true},
  {name:"Amount/₹",uid:'calculatedAmount'},
  {name: "ACTIONS", uid: "actions"},

];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export {columns, statusOptions};
