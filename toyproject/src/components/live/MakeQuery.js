import { useContext } from "react";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";
import { queryToggle } from "../../pages/Live";

function MakeQuery() {
  const { setQtoggle } = useContext(queryToggle);

  const queryName = useInput();
  const min = useInput();
  const max = useInput();

  const onMakeClick = () => {
    setQtoggle(false);
  };
  const onCancel = () => {
    setQtoggle(false);
  };

  return (
    <>
      <div>
        <div>
          <span>쿼리 이름</span>
          <Input name="queryname" {...queryName} />
        </div>

        <div>
          <span>태그 선택</span>
          <ul>
            {/* 여기에 선택된 태그가 li 형태로 들어옴 */}
            {/* 클릭하면 없어지는 기능까지 추가 */}
          </ul>
        </div>

        <div>
          <ul>
            {/* 여기에 태그 종류 들어옴 */}
            <li>태그</li>
            <li>태그</li>
            <li>태그</li>
            <li>...</li>
          </ul>
        </div>

        <div>
          <span>문제 푼 사람 수 범위 선택</span>
          <Input name="min" {...min} />
          <span>~</span>
          <Input name="max" {...max} />
        </div>

        <button onClick={onMakeClick}>쿼리 생성하기</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </>
  );
}

export default MakeQuery;
