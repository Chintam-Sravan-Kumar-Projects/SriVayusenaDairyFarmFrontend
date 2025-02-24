import React from "react";
const columns = [
  {name:"Date/Time",uid:"date",sortable:true},
  {name:"SHIFT",uid:"shift",sortable:true},
  {name:"Weight/Li",uid:"litter"},
  {name:"Category", uid:"category"},
  {name:"Rate/Li",uid:"rate"},
  {name:"Amount/₹",uid:'calculatedAmount'},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export {columns, statusOptions};
