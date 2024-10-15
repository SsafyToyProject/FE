import { useContext, useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import { queryToggle } from "../../../pages/Live";
import {
  Container,
  Section,
  Label,
  QueryList,
  QueryItem,
  RangeContainer,
  Button,
  CancelButton,
  CustomInput,
  QueryListContainer,
} from "../../../styles/live_styles/MakeQueryStyles";

function MakeQuery() {
  const { setQtoggle } = useContext(queryToggle);

  const queryName = useInput();
  const min = useInput();
  const max = useInput();

  const [queryList, setQueryList] = useState([
    "dfs",
    "dp",
    "math",
    "implemantation",
    "data_structures",
    "graphs",
    "greedy",
    "sorting",
    "binary_search",
  ]);
  const [selectedQuery, setSelectedQeury] = useState([]);

  const onQueryClick = (e) => {
    const exists = selectedQuery.some((item) => item === e.target.innerText);

    if (!exists) {
      setSelectedQeury([...selectedQuery, e.target.innerText]);
    }
  };

  const onDisSelectQuery = (e) => {
    const newQueries = [];
    selectedQuery.forEach((item) => {
      if (item !== e.target.innerText) {
        newQueries.push(item);
      }
    });

    setSelectedQeury(newQueries);
  };

  const onMakeClick = () => {
    setQtoggle(false);
  };

  const onCancel = () => {
    setQtoggle(false);
  };

  return (
    <Container>
      <Section>
        <Label>쿼리 이름</Label>
        <CustomInput name="queryname" {...queryName} />
      </Section>

      <Section>
        <Label>선택된 태그</Label>
        <QueryListContainer $isEmpty={selectedQuery.length === 0}>
          <QueryList>
            {selectedQuery.map((item, idx) => (
              <QueryItem key={idx} onClick={onDisSelectQuery}>
                {item}
              </QueryItem>
            ))}
          </QueryList>
        </QueryListContainer>
      </Section>

      <Section>
        <Label>쿼리 종류</Label>
        <QueryList>
          {queryList.map((tag, idx) => (
            <QueryItem key={idx} onClick={onQueryClick}>
              {tag}
            </QueryItem>
          ))}
        </QueryList>
      </Section>

      <Section>
        <Label>문제 푼 사람 수 범위 선택</Label>
        <RangeContainer>
          <CustomInput name="min" {...min} />
          <span>~</span>
          <CustomInput name="max" {...max} />
        </RangeContainer>
      </Section>

      <div>
        <Button onClick={onMakeClick}>쿼리 생성하기</Button>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </div>
    </Container>
  );
}

export default MakeQuery;
