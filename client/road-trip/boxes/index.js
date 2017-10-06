import boxes from './boxes';

function find(center) {
  return boxes
    .filter(box => box.center.x === center.x && box.center.y === center.y)
    .reduce((init, box) => init.concat(box.boxes), []);
}

export { find };
