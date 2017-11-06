import boxes from './boxes';
import TypeBox from './type-box';

function find(id) {
  return boxes
    .filter(box => box.id === id)
    .shift();
}

export { find, TypeBox as Type };
