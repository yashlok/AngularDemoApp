import { CanActivateChildFn } from '@angular/router';

export const check2Guard: CanActivateChildFn = (childRoute, state) => {
  let flag = sessionStorage.getItem("flag");
  return flag == "1" ? true : false;
};
