// 메인 화면에 들어갈 설명 요소
function Element({ title, des }) {
  return (
    <div>
      <strong>{title}</strong>
      <p>{des}</p>
    </div>
  );
}

export default Element;
