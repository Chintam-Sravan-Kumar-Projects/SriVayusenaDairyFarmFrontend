import React from "react";
const columns = [
  {name: "ID", uid: "_id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name:"MOBILE", uid:"mobile"},
  {name:"Village",uid:"village",sortable:true},
  {name:"GENDER", uid:"gender"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export {columns, statusOptions};
