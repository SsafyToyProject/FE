function SessionWait() {
  /*
SessionWait에서 필요한 것: session_id, user_id (context로 부터 가져오기)
5분전에 가져올 수 있는 정보: (problem_id, difficulty, title) 문제정보
prop으로 progress에 넘겨 줘야 할것: problem list

문제 정보조회 fetch url: /crawl/problem/{problemID}
요청 파라미터: X
답변 파라미터: 
{
    "problem_id":int,
    "difficulty":int,
    "title":string,
}

*/
  return (
    <>
      <div>SessionWait 중</div>
    </>
  );
}

export default SessionWait;
