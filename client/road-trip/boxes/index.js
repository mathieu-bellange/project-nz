import boxes from './boxes';
import TypeBox from './type-box';

function find(center) {
  return boxes
    .filter(box => box.center.x === center.x && box.center.y === center.y)
    .reduce((init, box) => init.concat(box.boxes), []);
}

export { find, TypeBox as Type };
