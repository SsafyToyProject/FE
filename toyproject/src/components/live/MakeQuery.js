import { useContext, useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";
import { queryToggle } from "../../pages/Live";

function MakeQuery() {
  const { setQtoggle } = useContext(queryToggle);

  const queryName = useInput();
  const min = useInput();
  const max = useInput();

  const [queryList, setQueryList] = useState([]);
  const [selectedQuery, setSelectedQeury] = useState([]);

  useEffect(() => {
    // 쿼리를 만들러 들어왔을 때 처음 fetch 하는 effect
    const queries = [];
    for (let i = 0; i < 3; i++) {
      queries.push({ id: "q" + i, query: "query" + i });
    }
    setQueryList(queries);
  }, []);

  const onQueryClick = (e) => {
    setSelectedQeury([...selectedQuery, { id: e.target.innerText, query: e.target.innerText }]);
  };

  const onDisSelectQuery = (e) => {
    const newQueries = [];
    selectedQuery.forEach((item) => {
      if (item.id !== e.target.innerText) {
        newQueries.push(item);
      }
    });

    setSelectedQeury(newQueries);
    console.log(newQueries);
  };

  // 쿼리 만들기를 눌렀을 때 작동하는 부분
  const onMakeClick = () => {
    setQtoggle(false);
  };

  // 취소하기 눌렀을 때 작동하는 부분
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
          <span>선택된 태그</span>
          <div>
            <ul>
              {/* 여기에 선택된 태그가 들어옴 */}
              {selectedQuery.map((item) => (
                <li key={item.id} onClick={onDisSelectQuery}>
                  {item.query}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <span>쿼리 종류</span>
          <div>
            <ul>
              {/* 여기에 태그 종류 들어옴 */}
              {queryList.map((tag) => (
                <li key={tag.id} onClick={onQueryClick}>
                  {tag.query}
                </li>
              ))}
            </ul>
          </div>
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
