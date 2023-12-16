const NUMBER = /^[0-9]*$/;

export const dateValidator = (str) => {
  const [month, week] = str.split(',');
  
  if (!NUMBER.test(month)) {
    throw new Error('[ERROR]');
  }
  if (Number(month) < 1 || Number(month) > 12) {
    throw new Error('[ERROR]');
  }

  const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
  if (!WEEK.includes(week)) {
    throw new Error('[ERROR]');
  }

};

export const workersValidator = (str1, str2) => {
  const array1 = str1.split(',').length;
  const array2 = str2.split(',').length;
  const size = new Set(array1.concat(array2)).size;
  const length = array1.length + array2.length;

  if (size !== length) {
    throw new Error('[ERROR]');
  }
};