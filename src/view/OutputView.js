import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printResult(array) {
    Console.print('');
    array.forEach((element) => Console.print(element));
  },

  printError(error) {
    Console.print(`${error}`);
  },
};

export default OutputView;

