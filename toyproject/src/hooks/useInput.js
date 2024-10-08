import { useState } from "react";

// inpupt에 달리는 훅.
const useInput = () => {
  // input의 밸류를 저장하는 state
  const [value, setValue] = useState("");

  // input의 onChange 함수
  const onChange = (e) => {
    setValue(e.target.value);
    //console.log(value);
  };

  // 만약에 확인 버튼 같은걸 눌렀을 때 input을 초기화 하고 싶으면 이걸 쓰면 됨
  const textclear = () => {
    setValue("");
  };

  return { value, onChange, textclear };
};

export default useInput;
