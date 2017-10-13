import boxes from './boxes';
import TypeBox from './type-box';

function find(id) {
  return boxes
    .filter(box => box.id === id)
    .reduce((init, box) => init.concat(box.boxes), []);
}

export { find, TypeBox as Type };
