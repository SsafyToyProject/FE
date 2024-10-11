import styled from "styled-components";

export const StyledInput = styled.input`
  border-radius: 10px;

  border: 1px solid grey;
`;

function Input({ id, name, type, onChange, value }) {
  return (
    <StyledInput
      id={id}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
