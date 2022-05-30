export {};

// Сделал два варианта сортировки, так как исходя из написанного в тз не понял насколько строгой она должна быть, в виду того что отсутствует точное указание цены, и есть только 
// диапазоны

// Также не совсем понял как можно реализовать алгоритм сортировки курсов по цене, учитывая отсутствие во входных данных цены и наличие исключительно диапазонов

let courses = [
  { name: "Courses in England", prices: [0, 100] }, 
  { name: "Courses in Germany", prices: [500, null] }, 
  { name: "Courses in Italy", prices: [100, 200] }, 
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

type TCourse = {
  name: string,
  prices: Array<number | null>
}

const noStrictSortCoursesByPrice = function (filterValue: Array<any>, dataCourses : Array<TCourse>): Array<object> | string {
  const suitCourses = dataCourses.filter((course) => {
    const courseMinValue : number | null = course.prices[0];
    const courseMaxValue : number | null = course.prices[1];
    const filterMinValue : number | null = filterValue[0];
    const filterMaxValue : number | null = filterValue[1];

    const firstCheck : boolean = courseMinValue > filterMaxValue ? false : true;
    const secondCheck : boolean = courseMaxValue < filterMinValue && courseMaxValue !== null ? false : true;
    const thirdCheck : boolean = filterMaxValue === null && (courseMinValue >= filterMinValue || courseMaxValue >= filterMinValue);

    return firstCheck && secondCheck || thirdCheck;
  })

  if (suitCourses.length === 0) {
    return 'В данный момент по выбранному фильтру нет подходящих значений';
  } else {
    return suitCourses;
  }
}

function strictSortCoursesByPrice (filterValue: Array<any>, dataCourses : Array<TCourse>) : Array<object> | string  {
  const suitCourses = dataCourses.filter((course) => {
    const courseMinValue : number | null = course.prices[0];
    const courseMaxValue : number | null = course.prices[1];
    const filterMinValue : number | null = filterValue[0];
    const filterMaxValue : number | null = filterValue[1];
  
    const firstCheck : boolean = courseMinValue >= filterMinValue;
    const secondCheck : boolean = courseMaxValue !== null ? courseMaxValue <= filterMaxValue : courseMaxValue === filterMaxValue;
  
    return firstCheck && secondCheck;
  })

  if (suitCourses.length === 0) {
    return 'В данный момент по выбранному фильтру нет подходящих значений';
  } else {
    return suitCourses;
  }
}

noStrictSortCoursesByPrice(requiredRange1, courses);
noStrictSortCoursesByPrice(requiredRange2, courses);
noStrictSortCoursesByPrice(requiredRange3, courses);

strictSortCoursesByPrice(requiredRange1, courses);
strictSortCoursesByPrice(requiredRange2, courses);
strictSortCoursesByPrice(requiredRange3, courses);
