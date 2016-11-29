const numberRegex = /\B(?=(\d{3})+(?!\d))/g;
export default function (number) {
  return number.toString().replace(numberRegex, ' ');
}
