import StudyBody from "../components/studymain/StudyBody";
import StudyInfo from "../components/studymain/StudyInfo";

import styled from "styled-components";

function Study() {
    return (
        <>
            <h1>NAV</h1>
            <StudyPageDiv>
                <StudyInfo />
                <StudyBody />
            </StudyPageDiv>
        </>
    );
}

const StudyPageDiv = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

export default Study;
