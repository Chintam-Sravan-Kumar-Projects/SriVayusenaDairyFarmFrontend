import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";

export default function Selectcustomer() {
  return (
    <Select
      isRequired
      label="Favorite Animal"
      placeholder="Select an animal"
      defaultSelectedKeys={["cat"]}
      className="max-w-xs"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
}
