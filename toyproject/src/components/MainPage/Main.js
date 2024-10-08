import Nav from "../Nav/Nav";
import Element from "./Elements/Element";

function Main() {
  return (
    <div>
      <Nav />
      <div>
        <h1>프로그램 이름</h1>
      </div>
      <div>
        <Element title="어떤 프로그램인가요?" des="프로그램 설명..." />
        <Element title="사용하는 방법" des="사용 방법 설명..." />
        <Element title="사용할 대상" des="사용할 대상 설명..." />
        <Element title="만든이들" des="프로그램 만든사람..." />
      </div>
    </div>
  );
}

export default Main;
