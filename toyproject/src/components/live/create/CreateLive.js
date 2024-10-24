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
import { useNavigate, useParams } from "react-router-dom";
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
  const { study_id } = useParams();

  useEffect(() => {
    async function fetch() {
      await axios.get("/api/crawl/query").then((res) => {
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

  const onCancel = () => {
    navigate(-1);
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
      return false;
    } else {
      const formElements = e.target.elements;
      // 시작날짜 및 시간 파싱
      const startstamp = formatDateToTimestamp(startDateInput.value, startTimeInput.value);

      // 종료날짜 및 시간 파싱
      const endstamp = formatDateToTimestamp(endDateInput.value, endTimeInput.value);

      // query id 가져오기
      const queryId = formElements.query.value;

      // 난이도 problemPool 만들기
      let problemPool = "";
      formElements.difficulties.forEach((item, idx) => {
        problemPool += item.value + " ";
      });
      console.log(problemPool);

      async function fetch() {
        try {
          console.log(queryId);
          console.log(startstamp);
          console.log(endstamp);
          console.log(problemPool);
          const response = await axios.post("/api/session/register", {
            study_id: study_id,
            query_id: queryId,
            start_at: startstamp,
            end_at: endstamp,
            problemPool: problemPool,
          });
          console.log(response);
          // 성공 후 페이지 이동을 원하면 navigate 호출
          navigate(`/study/${study_id}`, {
            replace: true,
          });
        } catch (e) {
          console.log("세션등록 실패: " + e);
        }
      }

      fetch();
    }
    e.preventDefault();
  };

  const formatDateToTimestamp = (date, time) => {
    const dateTimeString = `${date}T${time}`;
    const dateObj = new Date(dateTimeString);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
            <Select name="query" id="query">
              {queryList.map((item, idx) => (
                <option key={idx} value={item.query_id}>
                  {item.title}
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
                    <Select name="difficulties">
                      <option value="B4">B4</option>
                      <option value="B3">B3</option>
                      <option value="B2">B2</option>
                      <option value="B1">B1</option>
                      <option value="S4">S4</option>
                      <option value="S3">S3</option>
                      <option value="S2">S2</option>
                      <option value="S1">S1</option>
                      <option value="G4">G4</option>
                      <option value="G3">G3</option>
                      <option value="G2">G2</option>
                      <option value="G1">G1</option>
                      <option value="P4">P4</option>
                      <option value="P3">P3</option>
                      <option value="P2">P2</option>
                      <option value="P1">P1</option>
                    </Select>
                  </DifficultyItem>
                ))}
              </DifficultyList>
            </InputContainer>
          )}

          {/* 세션을 생성하면 => DB에 저장하는 요청을 보내고 */}
          {/* 성공하면 스터디 메인 화면으로 이동해야 함. */}
          <Button type="submit">세션 생성하기</Button>
          <Button type="button" onClick={onCancel}>
            취소하기
          </Button>
        </Container>
      ) : (
        <MakeQuery />
      )}
    </>
  );
}

export default CreateLive;
