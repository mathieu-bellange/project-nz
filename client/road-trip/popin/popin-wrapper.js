import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Raphael from 'raphael';
import isequal from 'lodash/isEqual';
import { Observable } from 'rxjs/Observable';

import './popin-wrapper.css';
import Popin from './popin';
import PopinText from './popin-text';
import * as Boxes from '../boxes';

function add(a1, a2) {
  return a1 + a2;
}
function subtract(a1, a2) {
  return a1 - a2;
}

// DONE redraw circle + lines sur un resize de window
// PLANNING modifier l'affichage du wrapper sous mobile trello:#34
export default class PopinWrapper extends React.Component {
  paper;
  center;
  containerSize;
  lineStyle = { stroke: '#BEBCBC', 'stroke-width': 2 };
  animations = [];
  mapPopinComponents = function mapPopinComponents(box) {
    let component = '';
    switch (box.type) {
      case Boxes.Type.Text:
        component = <PopinText
          box={box}
        />;
        break;
      case Boxes.Type.Picture:
      case Boxes.Type.Mixed:
        component = <Popin
          box={box}
        />;
        break;
      default:
        component = '';
    }
    return <div key={box.id} className={`popin-container ${box.left ? 'left' : 'right'} ${box.position !== undefined ? '' : 'alone'}`}>
      {component}
    </div>;
  };
  defineMiddleComponent = () => {
    const container = document.getElementById('middle-container');
    this.containerSize = {
      width: container.clientWidth,
      height: container.clientHeight
    };
    if (this.paper) this.paper.remove();
    this.paper = Raphael('middle-container', container.clientWidth, container.clientHeight);
    this.paper.customAttributes.arc = (centerX, centerY, startAngle, endAngle, arcEdge) => {
      const radians = Math.PI / 180;
      const largeArc = +(endAngle - startAngle > 180);
      // calculate the start and end points for both inner and outer edges of the arc segment
      // the -90s are about starting the angle measurement from the top get rid
      // of these if this doesn't suit your needs
      const outerX1 = centerX + (arcEdge * Math.cos((startAngle - 90) * radians));
      const outerY1 = centerY + (arcEdge * Math.sin((startAngle - 90) * radians));
      const outerX2 = centerX + (arcEdge * Math.cos((endAngle - 90) * radians));
      const outerY2 = centerY + (arcEdge * Math.sin((endAngle - 90) * radians));

      // build the path array
      const path = [
        ['M', outerX1, outerY1], // move to the start point
        ['A', arcEdge, arcEdge, 0, largeArc, 1, outerX2, outerY2] // draw the outer edge of the arc
      ];
      return { path };
    };
    this.center = {
      x: container.clientWidth / 2,
      y: container.clientHeight / 2
    };
  }

  static propTypes = {
    popinBoxes: PropTypes.array,
    drawCircle: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.drawingLines = this.drawingLines.bind(this);
    this.circleAnimation = this.circleAnimation.bind(this);
    this.defineBeginPoint = this.defineBeginPoint.bind(this);
    this.defineEndPoint = this.defineEndPoint.bind(this);
  }

  componentDidMount() {
    this.defineMiddleComponent();
    Observable
      .fromEvent(window, 'resize')
      .subscribe(() => {
        this.removeCircle();
        this.defineMiddleComponent();
        if (this.props.drawCircle) {
          this.circleAnimation(0);
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (!isequal(prevProps.drawCircle, this.props.drawCircle)) {
      if (this.props.drawCircle) {
        this.circleAnimation(0);
      } else {
        this.removeCircle();
      }
    }
  }

  removeCircle() {
    this.animations.forEach((animation) => {
      animation.remove();
    });
  }

  circleAnimation(x) {
    if (x < 360) {
      const animatedCircle = this.paper.path().attr({ stroke: '#BEBCBC', 'stroke-width': 2, arc: [this.center.x, this.center.y, 0, x, 10] });
      const animRotation = Raphael.animation({ transform: `r5,${this.center.x},${this.center.y}` }, 1, () => {
        this.circleAnimation(x + 5);
      });
      animatedCircle.animate(animRotation);
      this.animations.push(animatedCircle);
    } else {
      const circle = this.paper.circle(this.center.x, this.center.y, 10).attr(this.lineStyle);
      this.animations.push(circle);
      this.drawingLines();
    }
  }

  defineBeginPoint(index, left) {
    const begin = {};
    const exec = left ? subtract : add;
    switch (index) {
      case 0:
        begin.x = exec(this.center.x, (Math.cos(Math.PI / 4) * 10));
        begin.y = this.center.y - (Math.sin(Math.PI / 4) * 10);
        break;
      case 1:
        begin.x = exec(this.center.x, 10);
        begin.y = this.center.y;
        break;
      case 2:
      default:
        begin.x = exec(this.center.x, (Math.cos(Math.PI / 4) * 10));
        begin.y = this.center.y + (Math.sin(Math.PI / 4) * 10);
    }
    return begin;
  }

  defineStopPoint(begin, end, left) {
    const exec = left ? add : subtract;
    return {
      x: exec(end.x, begin.x / 2),
      y: end.y
    };
  }

  defineEndPoint(index, left) {
    const end = {};
    end.x = left ? 0 : this.containerSize.width;
    switch (index) {
      case 0:
        end.y = this.containerSize.height / 4;
        break;
      case 1:
        end.y = this.containerSize.height / 2;
        break;
      case 2:
      default:
        end.y = (this.containerSize.height / 4) * 3;
    }
    return end;
  }

  drawingLines() {
    const lines = [];
    this.props.popinBoxes
      .filter(popinBox => popinBox.position !== undefined)
      .forEach((popinBox) => {
        const begin = this.defineBeginPoint(popinBox.position, popinBox.left);
        const end = this.defineEndPoint(popinBox.position, popinBox.left);
        const firstStop = this.defineStopPoint(begin, end, popinBox.left);
        lines.push({
          begin,
          end,
          firstStop
        });
      }, this);
    lines.forEach((line) => {
      const firstLine = this.paper.path(`M${line.begin.x} ${line.begin.y}`).attr(this.lineStyle);
      const secondLine = this.paper.path(`M${line.firstStop.x} ${line.firstStop.y}`).attr(this.lineStyle);
      this.animations.push(firstLine);
      this.animations.push(secondLine);
      firstLine.animate({ path: `M${line.begin.x} ${line.begin.y} L${line.firstStop.x} ${line.firstStop.y}` }, 1000, () => {
        secondLine.animate({ path: `M${line.firstStop.x} ${line.firstStop.y} L${line.end.x} ${line.end.y}` }, 1000);
      });
    }, this);
  }

  render() {
    return (
        <div className="popin-wrapper">
          <div id="left-container">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={500}>
              {
                this.props.popinBoxes
                  .filter(popinBox => popinBox.left)
                  .map(this.mapPopinComponents)
                }
              </ReactCSSTransitionGroup>
            </div>
          <div id="middle-container">

          </div>
          <div id="right-container">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={500}>
              {
                this.props.popinBoxes
                  .filter(popinBox => !popinBox.left)
                  .map(this.mapPopinComponents)
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>
    );
  }
}
