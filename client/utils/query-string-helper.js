export default function(parameters) {
  let string = '?';

  for(let key in parameters) {
    string += `${key}=${parameters[key]}&`;
  }
  
  return string.slice(0,-1);
}
