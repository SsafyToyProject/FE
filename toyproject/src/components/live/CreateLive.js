import { useState } from "react";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";

function CreateLive() {
  const { value, onChange } = useInput();

  return (
    <>
      <div>
        <Input id="input1" onChange={onChange} value={value} />
        <span>{value}</span>
      </div>
    </>
  );
}

export default CreateLive;
