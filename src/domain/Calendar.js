/*
1/1
3/1
5/5
6/6
8/15
10/3
10/9
12/25
*/
// 휴일 (토, 일, 법정공휴일)
// 평일 (월 화 수 목 금)


class Calendar {
  #date;

  constructor(year, month, date) {
    this.#date = new Date(year, month - 1, date); // 월은 0부터 시작이기 때문.
  }

  bringDate() {
    return this.#date.getDate();
  }

  bringMonth() {
    return this.#date.getMonth() + 1; // 월은 0부터 시작 이기 때문.
  }

  bringYear() {
    return this.#date.getFullYear();
  }

  bringWeek() {
    const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
    
    return WEEK[this.#date.getDay()];
  }
  

  bringWeekdayOrHoliday() {
    if (this.bringMonth() === 1 && this.bringDate() === 1) return '휴일';
    if (this.bringMonth() === 3 && this.bringDate() === 1) return '휴일';
    if (this.bringMonth() === 5 && this.bringDate() === 5) return '휴일';
    if (this.bringMonth() === 6 && this.bringDate() === 6) return '휴일';
    if (this.bringMonth() === 8 && this.bringDate() === 15) return '휴일';
    if (this.bringMonth() === 10 && this.bringDate() === 3) return '휴일';
    if (this.bringMonth() === 10 && this.bringDate() === 9) return '휴일';
    if (this.bringMonth() === 12 && this.bringDate() === 25) return '휴일';
    if (this.bringWeek() === '토' || this.bringWeek() === '일') return '주말';

    return '평일';
  }

  checkSpecialHoliday() {
    if (this.bringWeek() !== '토' && this.bringWeek() !== '일' && this.bringWeekdayOrHoliday() === '휴일') {
      return true;
    }
    return false;
  }
  
  // 해당 달의 마지막 일수를 구해준다(28 or 29 or 30 or 31)
  static getLastDayOfMonth(year, month) {
    const date = new Date(year, month, 0);

    return date.getDate();
  }
}

export default Calendar;
