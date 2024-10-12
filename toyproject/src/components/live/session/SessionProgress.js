function SessionProgress() {
  /*
트래커 fetch url: /tracker/info/{session_id}/{user_id}/{problem_id}
요청 파라미터: {
	"session_id" : int,
	"used_id" : int,
	"problem_id" : int
}

답변 파라미터: {
	"num_elements":int,
	"trackers": [{
		"solved_at": timestamp,
		"performance": int,
		"language": string,
		"code_link": string,
		"description": string,
	}],
}

즉, 특정 유저의 특정 문제에 대해 정보를 하나 가지고 온다. 
그러니깐, (사람수 * 문제 수) 만큼의 요청이 매번 필요한 느낌?
*/

  return (
    <>
      <div>SessionProgress 중</div>
    </>
  );
}

export default SessionProgress;
