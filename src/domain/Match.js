import Calendar from "./Calendar.js";
/*
- 기본적으로 순번에 따라 비상 근무일을 배정한다.(1)
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
  calendarArray = []; // ['평일', '평일', '평일', '평일', '휴일', '주말', '주말', '평일',.....]

  matchArray = [];

  startDate;
  lastDate;  
  constructor() {

  }
  
  // 원본. ex ('5','월')
  // calendarArray = ['평일', '평일', '평일', '평일', '휴일', '주말', '주말', '평일',.....] 로 세팅해준다.
  setMonthWithWeek(monthStr, weekStr) {
    const month = Number(monthStr);
    this.lastDate = Calendar.getLastDayOfMonth(20203, month);
    for (let i = 1; i <= this.lastDate; i++) {
      const find = new Calendar(2023, month, i);
      if (find.bringWeek() === weekStr) {
        this.startDate = find.bringDate();
        break;
      }
    }
    for (let i = this.startDate; i <= this.lastDate; i++) {
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

  weekIndex = 0;
  holidayIndex = 0;
  // input : w(평일) or h(휴일)
  updateIndex(str) {
    const maxIndex = this.holidayWorkers.length - 1;
    if (str === 'w' && this.weekIndex === maxIndex) return this.weekIndex = 0;
    if (str === 'h' && this.holidayIndex === maxIndex) return this.holidayIndex = 0;
    
    if (str === 'w' && this.weekIndex !== maxIndex) {
      return this.weekIndex += 1;
    }
    if (str === 'h' && this.holidayIndex !== maxIndex) {
      return this.holidayIndex += 1;
    }
    
  }
  
  match() {
    this.calendarArray.forEach((status) => {
      if (status === '평일') {
        this.matchArray.push(this.weekWorkers[this.weekIndex]);
        this.updateIndex('w');
      } else {
        this.matchArray.push(this.holidayWorkers[this.holidayIndex]);
        this.updateIndex('h');
      } 
    });
  }




}

export default Match;
/*
const a = new Match();
a.setMonthWithWeek('5', '월');
a.setWeekWorkers('평1,평2,평3,평4,평5');
a.setHolidayWorkers('홀1,홀2,홀3,홀4,홀5');
a.match();

console.log(a.matchArray);
*/



