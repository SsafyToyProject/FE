import Nav from "../common/Nav";
import Element from "./Elements/Element";
import styled from "styled-components";

function List() {
  return (
    <div>
      {/* 헤더 */}
      <Nav />
      <h1>스터디 목록</h1>
      {/* 스터디 목록 나타내기 */}
      <Element title="스터디1" des="스터디1 설명" studyId=""></Element>
    </div>
  );
}

export default List;
