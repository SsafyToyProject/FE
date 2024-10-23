import { createContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

/*
session 관련한 모든게 렌더링되는 페이지

내 생각엔 context를 이 session 페이지에서 관리를 해서 context로 부터 가져다 쓰는게 편할듯
근데 지금 Session에서 url parameter로 가져오게 되어 있어서, 그냥 wait이랑 progress에서도 param으로 쓸지 context 할지 고민중..

flow: studymain에서 참가하기 -> 이때, session_id, user_id 넘겨줌 -> Context에 저장하고 자식컴포넌트들에서 사용

useContext 목록: user_id, session_id
*/

const IdContext = createContext();

function Session() {
  const { user_id, session_id } = useParams();

  const [userId, setUserId] = useState(user_id);
  const [sessionId, setSessionId] = useState(session_id);

  useEffect(() => {
    setUserId(userId);
    setSessionId(sessionId);
  }, []);

  return (
    <div>
      <IdContext.Provider value={(userId, sessionId)}>
        <Outlet />
      </IdContext.Provider>
    </div>
  );
}

export default Session;
