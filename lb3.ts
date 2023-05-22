type AddFunction = (num: number) => AddFunction | number;

function add(num: number): AddFunction {
  let sum = num;

  function innerAdd(nextNum: number): AddFunction | number {
    if (nextNum === undefined) {
      return sum;
    }
    sum += nextNum;
    return innerAdd;
  }

  const result = ((nextNum?: number) => innerAdd(nextNum)) as AddFunction;

  return result;
}

console.log((add(2)(5)(7)(1)(6)(5)(10) as () => number)()); // Output: 36
//2

function isAnagram(str1: string, str2: string): boolean {
  const arr1 = str1.replace(/\s/g, "").split("");
  const arr2 = str2.replace(/\s/g, "").split("");

  if (arr1.length !== arr2.length) {
    return false;
  }

  const freq1: { [key: string]: number } = arr1.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const freq2: { [key: string]: number } = arr2.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  for (const key in freq1) {
    if (freq1[key] !== freq2[key]) {
      return false;
    }
  }

  return true;
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));
//3
function deepClone(obj: any): any {
  let clone: any = {};

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      clone[key] = deepClone(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
}

const original = {
  a: 1,
  b: {
    c: 2,
  },
};

const cloned = deepClone(original);

cloned.b.c = 7;
console.log(original.b.c); // 2
//4
const cacheFunctionResult = <T extends (...args: any[]) => any>(fn: T) => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = args.join("|");
    const cachedResult = cache.get(key);

    if (cachedResult) {
      return cachedResult;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
};

const calc = (a: number, b: number, c: number): number => a + b + c;

const cachedCalc = cacheFunctionResult(calc);

console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache
