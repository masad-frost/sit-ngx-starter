import { URLSearchParams } from '@angular/http';

export function objToSearchParams(obj: object): URLSearchParams {
  const params: URLSearchParams = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && obj[key].constructor === Array) {
        if (obj[key].length > 0) {
          for (const item of obj[key]) {
            if (item !== '') {
              params.append(key, item);
            }
          }
        }
      } else {
        if (obj[key] !== '') {
          params.set(key, obj[key]);
        }
      }
    }
  }
  return params;
}
