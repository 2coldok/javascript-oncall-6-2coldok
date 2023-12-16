import Match from "../domain/Match.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class Controller {
  match;

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
      this.match.setMonthWithWeek(monthWithWeek);
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
  }
}

export default Controller;
