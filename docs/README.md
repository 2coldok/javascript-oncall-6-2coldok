<스토리>



<요구사항 - 배정>
- 기본적으로 순번에 따라 비상 근무일을 배정한다.
- 비상 근무자는 평일 순번, 휴일 순번에 각각 1회 편성되어야 한다.(ex.평일 순번에 같은 인원이 두번 배정 불가능)
- 비상근무자 연속 2일 근무 불가능 
- 순번상 특정 근무자가 연속 2일 근무하게 되는 상황에는, 다음 근무자와 순서를 바꿔 편성한다.
- 만약에 법정공휴일인 수요일에 수아가 비상 근무를 서고 다음 날 평일 순번이 수아인 경우에는,
다음 평일 근무자와 순서를 바꿔서 근무한다.
- 비상 근무자 배정 시 다음 근무자와 순서를 바꿔야 하는 경우에는, 앞의 날짜부터 순서를 변경해야 한다.(최근 꺼부터 차례대로 변경 ㅇㅇ)

<요구사항 - >
닉네임 : 중복불허, 최대 5자
비상 근무자 : 최소 5명 최대 35


<요구 사항 - 스페셜>
- how to solve 답변하기

<요구사항 - 입출력>
- 달 과 시작요일 정보 부적합시 에러
- [평일 순번] 또는 [휴일 순번]의 입력 값이 올바르지 않은 경우, **'평일 순번'**부터 다시 입력 받는다.(이름 중복 같은 올바르지 않은 형식일시)
- 평일이면서 법정공휴일의 경우에만 요일 뒤에 (휴일) 표기를 해야 한다.

<기능 구현>
- 캘릭더 기능 구현 : 날짜 요일을 확인할 수 있는 클래스 (1)
- 매치 기능 구현 :
시작월 과 요일을 통해 가장 해당 달에 해당 요일에 가장 최근 일수부터 시작해여 요일 배열 저장 기능
배정 1 단계. 기본적으로 순서대로 배정 기능 구현

배정 2 단계. 연속시, 뒷 사람이랑 순서 변경

-> 연속되는 근무자에 대해 순서 변경 
..c c ..연속된 평일 근무자 => 두번째 c의 해당요일 근무자를 뒤 에서 찾음.

평 : b c d a
홀 : d b c a
월 화 수 목 (금) (토) (일) 월 화 수
a b  c d   d   b    c  a  b  c  
a b  c d   b   d    c  a  b  c   

토 일 월 화 수
d  b  b c d
d  b  c b d
