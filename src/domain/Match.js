import Calendar from "./Calendar.js";
/*
- 기본적으로 순번에 따라 비상 근무일을 배정한다.
- 비상 근무자는 평일 순번, 휴일 순번에 각각 1회 편성되어야 한다.(ex.평일 순번에 같은 인원이 두번 배정 불가능)
- 비상근무자 연속 2일 근무 불가능 
- 순번상 특정 근무자가 연속 2일 근무하게 되는 상황에는, 다음 근무자와 순서를 바꿔 편성한다.
- 만약에 법정공휴일인 수요일에 수아가 비상 근무를 서고 다음 날 평일 순번이 수아인 경우에는,
다음 평일 근무자와 순서를 바꿔서 근무한다.
- 비상 근무자 배정 시 다음 근무자와 순서를 바꿔야 하는 경우에는, 앞의 날짜부터 순서를 변경해야 한다.(최근 꺼부터 차례대로 변경 ㅇㅇ)
*/
//연속 2일 근무 하는지 체크
//순서 바꾸는 기능 구 현

class Match {
  weekWorkers;
  holidayWorkers;

  calendarArray = [];

  
  constructor() {

  }
  
  // 원본. ex ('5','월')
  // calendarArray = ['평일', '평일', '평일', '평일', '휴일', '주말', '주말', '평일',.....] 로 세팅해준다.
  setMonthWithWeek(monthStr, weekStr) {
    const month = Number(monthStr);
    const lastDate = Calendar.getLastDayOfMonth(20203, month);
    const startDate = [];
    for (let i = 1; i <= lastDate; i++) {
      const find = new Calendar(2023, month, i);
      if (find.bringWeek() === weekStr) {
        startDate.push(find.bringDate());
        break;
      }
    }
    const [start] = startDate;
    for (let i = start; i <= lastDate; i++) {
      const calendar = new Calendar(2023, month, i);
      this.calendarArray.push(calendar.bringWeekdayOrHoliday());
    }
  }
  
  // 원본
  setWeekWorkers(str) {
    this.weekWorkers = str.split(',');
  }
  
  // 원본
  setHolidayWorkers(str) {
    this.holidayWorkers = str.split(',');
  }



}

export default Match;
/*
const a = new Match();



*/

