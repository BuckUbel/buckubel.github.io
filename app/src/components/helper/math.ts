export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getBaseLog(x:number, y:number) {
  return Math.log(y) / Math.log(x);
}

export function changeNumberBase  (value:number,base:number)  {

  let result = [];

  while (value > 0){
    result.unshift(value % base);
    value = Math.floor(value / base);
  }

  return result.join('');
}
