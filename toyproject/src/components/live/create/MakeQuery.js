import { useContext, useState } from "react";
import axios from "axios";
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
  RangeInputWrapper,
  RangeInput,
  InputLabel,
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
    "implementation",
    "data_structures",
    "graphs",
    "greedy",
    "sorting",
    "binary_search",
  ]);
  const [plusQuery, setPlusQuery] = useState([]);
  const [minusQuery, setMinusQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onPlusQueryClick = (e) => {
    const exists = plusQuery.some((item) => item === e.target.innerText);

    if (!exists) {
      setPlusQuery([...plusQuery, e.target.innerText]);
    }
  };

  const onMinusQueryClick = (e) => {
    const exists = minusQuery.some((item) => item === e.target.innerText);

    if (!exists) {
      setMinusQuery([...minusQuery, e.target.innerText]);
    }
  };

  const onDisSelectPlusQuery = (e) => {
    const newQueries = [];
    plusQuery.forEach((item) => {
      if (item !== e.target.innerText) {
        newQueries.push(item);
      }
    });

    setPlusQuery(newQueries);
  };

  const onDisSelectMinusQuery = (e) => {
    const newQueries = [];
    minusQuery.forEach((item) => {
      if (item !== e.target.innerText) {
        newQueries.push(item);
      }
    });

    setMinusQuery(newQueries);
  };

  // 만들기 클릭 => 이거 쿼리등록 엄청 오래걸려서 이거 하는 동안 로딩이 보이게끔 수정해야 함...
  // 지금 만약에 쿼리 조합에 따라서 문제 수가 0개인 경우 400 error 발생 => 에러 컨트롤 해줘야함
  const onMakeClick = async () => {
    // 스트링 만들기
    let queryStr = "";
    if (max.value !== "") {
      if (queryStr.length === 0) {
        queryStr += "s%23" + max.value + "..";
      } else {
        queryStr += "+s%23" + max.value + "..";
      }
    }
    // 추가 쿼리 스트링에 넣기
    plusQuery.forEach((item, idx) => {
      if (queryStr.length === 0) {
        queryStr += "%23" + item;
      } else {
        queryStr += "+" + "%23" + item;
      }
    });
    // 제외 쿼리 스트링에 넣기
    minusQuery.forEach((item, idx) => {
      if (queryStr.length === 0) {
        queryStr += "-%23" + item;
      } else {
        queryStr += "+" + "-%23" + item;
      }
    });
    // 사람 수 범위 스트링에 넣기
    if (min.value !== "") {
      if (queryStr.length === 0) {
        queryStr += "s%23.." + min.value;
      } else {
        queryStr += "+s%23.." + min.value;
      }
    }

    console.log(queryStr);

    try {
      setIsLoading(true);

      const response = await axios.post("/api/crawl/query", {
        title: queryName.value,
        query_str: queryStr,
      });

      console.log("쿼리 등록 성공! " + response);

      //setQtoggle(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        <Label>추가 선택된 태그</Label>
        <QueryListContainer $isEmpty={plusQuery.length === 0}>
          <QueryList>
            {plusQuery.map((item, idx) => (
              <QueryItem key={idx} onClick={onDisSelectPlusQuery}>
                {item}
              </QueryItem>
            ))}
          </QueryList>
        </QueryListContainer>
      </Section>

      <Section>
        <Label>제외 선택된 태그</Label>
        <QueryListContainer $isEmpty={minusQuery.length === 0}>
          <QueryList>
            {minusQuery.map((item, idx) => (
              <QueryItem key={idx} onClick={onDisSelectMinusQuery}>
                {item}
              </QueryItem>
            ))}
          </QueryList>
        </QueryListContainer>
      </Section>

      <Section>
        <Label>추가 쿼리</Label>
        <QueryList>
          {queryList.map((tag, idx) => (
            <QueryItem key={idx} onClick={onPlusQueryClick}>
              {tag}
            </QueryItem>
          ))}
        </QueryList>
      </Section>

      <Section>
        <Label>제외 쿼리</Label>
        <QueryList>
          {queryList.map((tag, idx) => (
            <QueryItem key={idx} onClick={onMinusQueryClick}>
              {tag}
            </QueryItem>
          ))}
        </QueryList>
      </Section>

      <Section>
        <Label>문제 푼 사람 수 범위 입력</Label>

        <RangeContainer>
          <RangeInputWrapper>
            <RangeInput name="max" {...max} />
            <InputLabel>이상</InputLabel>
          </RangeInputWrapper>
        </RangeContainer>

        <RangeContainer>
          <RangeInputWrapper>
            <RangeInput name="min" {...min} />
            <InputLabel>이하</InputLabel>
          </RangeInputWrapper>
        </RangeContainer>
      </Section>

      <div>
        <Button onClick={onMakeClick}>쿼리 생성하기</Button>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        {isLoading && <span>로딩중입니다...</span>}
      </div>
    </Container>
  );
}

export default MakeQuery;
