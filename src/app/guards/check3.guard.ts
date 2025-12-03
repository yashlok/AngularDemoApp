import { CanMatchFn } from '@angular/router';

export const check3Guard: CanMatchFn = (route, segments) => {
  let flag = sessionStorage.getItem("flag");
  return flag == "1" ? true : false;
};
