import { add, divide, subtract, multiply, unaryMinus } from 'mathjs';

// DONE déplacer dans tools/line-animation trello:#66
// TODO merger tout dans tools/animated-line trello:#67
function movePointTo(delta, alpha, k, x, exitX, exec, onStepCallback, onCompleteCallback) {
  const newX = exec(x, delta);
  const orthogonalY = add(multiply(newX, alpha), k);
  onStepCallback({
    x: newX,
    y: unaryMinus(orthogonalY)
  });
  if (newX > exitX) {
    setTimeout(() => {
      movePointTo(delta, alpha, k, newX, exitX, exec, onStepCallback, onCompleteCallback);
    }, 5);
  } else {
    onCompleteCallback();
  }
}

// DONE déplacer dans tools/line-animation trello:#66
function lineDeplacementAnimation(pointA, pointB, onStepCallback, onCompleteCallback) {
  const alpha = divide(subtract(-pointA.y, -pointB.y), subtract(pointA.x, pointB.x));
  const k = subtract(-pointA.y, multiply(alpha, pointA.x));
  const delta = Math.abs(divide(subtract(pointB.x, pointA.x), 400));
  const func = pointA.x < pointB.x ? add : subtract;
  movePointTo(delta, alpha, k, pointA.x, pointB.x, func, onStepCallback, onCompleteCallback);
}


export default lineDeplacementAnimation;
