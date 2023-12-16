import Calendar from "./Calendar.js";

class Match {
  weekWorkers;
  holidayWorkers;
  calendarArray = []; 

  matchArray = [];

  month;
  startDate;
  lastDate;  
  

  setMonthWithWeek(monthStr, weekStr) {
    const month = Number(monthStr);
    this.month = month;
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
  
  setWeekWorkers(str) {
    this.weekWorkers = str.split(',');
  }
  
  setHolidayWorkers(str) {
    this.holidayWorkers = str.split(',');
  }

  weekIndex = 0;
  holidayIndex = 0;
  
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
  
  startMatch() {
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

  rematch() {
    const copy = this.matchArray.slice();
    const startIndexArray = this.findStartIndex().slice();
    
    const temp = [];
    startIndexArray.forEach((element) => {
      const temp1 = copy.with(element + 1, copy[element + 2]);
      
      const temp2 = temp1.with(element + 2, copy[element + 1]);
      
      temp.push(temp2);
    });

    return temp.at(-1);
  }
  
  findStartIndex() {
    const copy = this.matchArray.slice();
    copy.shift();
    copy.push('end');
    const startIndex = [];
    this.matchArray.forEach((element, index) => {
      if (element === copy[index]) startIndex.push(index);
    })
    return startIndex;
  }
}

export default Match;

/*
const match = new Match();
match.setMonthWithWeek('4,토');
match.setWeekWorkers("허브,쥬니,말랑,라온,헤나,우코,에단,수달,파워,히이로,마코,슬링키,모디,연어,깃짱,리오,고니,박스터,달리,조이,노아이즈,도이,도치,홍고,스캇,폴로,해시,로지,첵스,아이크,우가,푸만능,애쉬,로이스,오션");

match.setHolidayWorkers("오션,로이스,애쉬,푸만능,우가,아이크,첵스,로지,해시,폴로,스캇,홍고,도치,도이,노아이즈,조이,달리,박스터,고니,리오,깃짱,연어,모디,슬링키,마코,히이로,파워,수달,에단,우코,헤나,라온,말랑,쥬니,허브");

match.startMatch();

const k = match.rematch();

console.log(k);
*/


