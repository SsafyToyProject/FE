import useInput from "../../../hooks/useInput";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  InputContainer,
  Label,
  Select,
  Button,
  DifficultyList,
  DifficultyItem,
  CustomInput,
} from "../../../styles/live_styles/CreateLiveStyles";
import { useNavigate } from "react-router-dom";
import { queryToggle } from "../../../pages/Live";
import MakeQuery from "../create/MakeQuery";

function CreateLive() {
  const startDateInput = useInput();
  const startTimeInput = useInput();
  const endDateInput = useInput();
  const endTimeInput = useInput();
  const countInput = useInput();

  const [difflist, setDiffList] = useState([]);
  const [queryList, setQueryList] = useState([]);
  const navigate = useNavigate();
  const { qtoggle, setQtoggle } = useContext(queryToggle);

  useEffect(() => {
    async function fetch() {
      await axios.get("/crawl/query").then((res) => {
        console.log(res.data.items);
        setQueryList(res.data.items);
      });
    }
    fetch();
  }, [qtoggle]);

  const onCountBtnClick = () => {
    const newDiff = [];
    for (let i = 0; i < countInput.value; i++) {
      newDiff.push({ id: i, name: "diff" + i });
    }
    setDiffList(newDiff);
  };

  const onMakeQueryClick = () => {
    setQtoggle(true);
  };

  const onSubmit = (e) => {
    if (
      startDateInput.value.length === 0 ||
      startTimeInput.value.length === 0 ||
      endDateInput.value.length === 0 ||
      endTimeInput.value.length === 0 ||
      countInput.value.length === 0
    ) {
      alert("빈 칸을 다 채워주세요!!!");
      e.preventDefault();
      return false;
    } else {
      navigate("/live");
    }
  };

  return (
    <>
      {!qtoggle ? (
        <Container onSubmit={onSubmit}>
          {/* 시작날짜 및 시간 입력 */}
          <InputContainer>
            <Label>시작날짜 및 시간</Label>
            <CustomInput name="startDate" type="date" {...startDateInput} />
            <CustomInput name="startTime" type="time" {...startTimeInput} />
          </InputContainer>

          {/* 종료날짜 및 시간 입력 */}
          <InputContainer>
            <Label>종료날짜 및 시간</Label>
            <CustomInput name="endDate" type="date" {...endDateInput} />
            <CustomInput name="endTime" type="time" {...endTimeInput} />
          </InputContainer>

          {/* 기존 쿼리 선택 */}
          <InputContainer>
            <Label>쿼리 선택하기</Label>
            {/* <수정필요> 여기 옵션으로 DB에서 쿼리 리스트를 가져와야 함 */}

            <Select name="query" id="query">
              {queryList.map((item, idx) => (
                <option key={idx} value={item.title}>
                  {item.query_id}
                </option>
              ))}
            </Select>
            {/* 여기서 쿼리 만드는 페이지로 이동. makeQuery.js */}
            <Button type="button" onClick={onMakeQueryClick}>
              쿼리 만들기
            </Button>
          </InputContainer>

          {/* 문제 수 입력 받기 */}
          <InputContainer>
            <Label>문제 수 입력</Label>
            <CustomInput name="count" type="number" {...countInput} />
            <Button type="button" onClick={onCountBtnClick}>
              확인
            </Button>
          </InputContainer>

          {/* 문제 난이도 설정 */}
          {difflist.length !== 0 && (
            <InputContainer>
              <Label>문제 난이도 설정하기</Label>
              <DifficultyList>
                {difflist.map((input) => (
                  <DifficultyItem key={input.id}>
                    <Select name={input.name}>
                      <option value="1">S4</option>
                      <option value="2">S3</option>
                      <option value="3">S2</option>
                      <option value="4">S1</option>
                    </Select>
                  </DifficultyItem>
                ))}
              </DifficultyList>
            </InputContainer>
          )}

          {/* 세션을 생성하면 => DB에 저장하는 요청을 보내고 */}
          {/* 성공하면 스터디 메인 화면으로 이동해야 함. */}
          <Button type="submit">세션 생성하기</Button>
        </Container>
      ) : (
        <MakeQuery />
      )}
    </>
  );
}

export default CreateLive;
