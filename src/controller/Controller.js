import Match from "../domain/Match.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import Calendar from "../domain/Calendar.js";
import { dateValidator, workersValidator } from "../util/Validator.js";

class Controller {
  match;
  startDate;

  constructor() {
    this.match = new Match();
  }

  async start() {
    await this.getMonth();
    await this.boot();
    this.showResult();
  }

  async getMonth() {
    try {
      const monthWithWeek = await InputView.readMonth();
      dateValidator(monthWithWeek);
      const array = monthWithWeek.split(',');
      this.match.setMonthWithWeek(array[0], array[1]);
    } catch (error) {
      OutputView.printError(error);
      return await this.getMonth();
    }
  }

  async boot() {
    try {
      const weekWorkers = await InputView.readWeekWorkers();
      this.match.setWeekWorkers(weekWorkers);

      const holidayWorkers = await InputView.readHolidayWorkers();
      this.match.setHolidayWorkers(holidayWorkers);
    } catch (error) {
      OutputView.printError(error);
      return await this.boot();
    }
  }

  showResult() {
    this.match.startMatch();
    const result = this.match.rematch();
    const month = this.match.month;
    this.startDate = this.match.startDate;
    
    const k = result.map((element) => {
      const calendar = new Calendar(2023, month, this.startDate);
      if (calendar.checkSpecialHoliday()) {
        const form =  `${month}월 ${calendar.bringDate()}일 ${calendar.bringWeek()}(휴일) ${element}`;
        this.startDate += 1;
        return form;
      }
      const form =  `${month}월 ${calendar.bringDate()}일 ${calendar.bringWeek()} ${element}`;
      this.startDate += 1;
      
      return form;
    
    });
    OutputView.printResult(k);
  }
}

export default Controller;
