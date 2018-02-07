import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SVG from 'svg.js';
import isequal from 'lodash/isEqual';
import { Observable } from 'rxjs/Observable';

import './popin-wrapper.css';
import Popin from './popin';
import PopinText from './popin-text';
import IconsWrapper from './icons-wrapper';
import * as Boxes from '../boxes';

function add(a1, a2) {
  return a1 + a2;
}
function subtract(a1, a2) {
  return a1 - a2;
}

// PLANNING corriger l'apparition des boxes entre deux steps trello:#79
// DONE le cercle des popins n'est pas bien centré trello:#79
// PLANNING la croix de fermeture des popins n'est pas très visible trello:#79
// PLANNING ouverture de popins non fonctionnelles sous edge trello:#79
export default class PopinWrapper extends React.Component {
  draw;
  center;
  containerSize;
  lineStyle = { color: '#BEBCBC', width: 2 };
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
    return <CSSTransition
              key={box.id}
              classNames='fade-animation'
              timeout={{ enter: 1000, exit: 500 }}
          >
        <div className={`popin-container ${box.left ? 'left' : 'right'} ${box.position !== undefined ? '' : 'alone'}`}>
          {component}
        </div>
    </CSSTransition>;
  };
  defineMiddleComponent = () => {
    if (this.draw) this.draw.remove();
    if (window.innerWidth < 1024) return;
    const container = document.getElementById('middle-container');
    this.containerSize = {
      width: container.clientWidth,
      height: container.clientHeight
    };
    this.draw = SVG('middle-container', container.clientWidth, container.clientHeight);
    this.center = {
      x: container.clientWidth / 2,
      y: container.clientHeight / 2
    };
  }

  static propTypes = {
    popinBoxes: PropTypes.array,
    drawCircle: PropTypes.bool,
    loading: PropTypes.bool
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
        this.forceUpdate();
        if (this.props.drawCircle) {
          this.circleAnimation();
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (!isequal(prevProps.drawCircle, this.props.drawCircle)) {
      if (this.props.drawCircle) {
        this.circleAnimation();
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

  circleAnimation() {
    if (window.innerWidth < 1024) return;
    const animatedCircle = this.draw.circle(20)
      .stroke({
        color: '#BEBCBC',
        width: 2,
        dasharray: 65,
        dashoffset: 65
      })
      .attr({ cx: this.center.x, cy: this.center.y })
      .transform({ rotation: -90 });
    this.animations.push(animatedCircle);
    animatedCircle.animate(2000, '-')
      .stroke({ dashoffset: 0 })
      .after(() => this.drawingLines());
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
      const firstLine = this.draw.line(line.begin.x, line.begin.y, line.begin.x, line.begin.y)
        .stroke(this.lineStyle);
      this.animations.push(firstLine);
      firstLine.animate(1000, '-')
        .plot(line.begin.x, line.begin.y, line.firstStop.x, line.firstStop.y)
        .after(() => {
          const secondLine = this.draw.line(line.firstStop.x, line.firstStop.y, line.firstStop.x, line.firstStop.y)
            .stroke(this.lineStyle);
          this.animations.push(secondLine);
          secondLine.animate(1000, '-')
            .plot(line.firstStop.x, line.firstStop.y, line.end.x, line.end.y);
        });
    }, this);
  }

  render() {
    return (
        <div className={`popin-wrapper ${this.props.loading ? 'loading' : ''}`}>
          <div id="left-container">
            <TransitionGroup>
              {
                this.props.popinBoxes
                  .filter(() => window.innerWidth >= 1024)
                  .filter(popinBox => popinBox.left)
                  .map(this.mapPopinComponents, this)
                }
              </TransitionGroup>
            </div>
          <div id="middle-container">
            <IconsWrapper popinBoxes={this.props.popinBoxes
              .filter(() => window.innerWidth < 1024)}>
            </IconsWrapper>
          </div>
          <div id="right-container">
            <TransitionGroup>
              {
                this.props.popinBoxes
                  .filter(() => window.innerWidth >= 1024)
                  .filter(popinBox => !popinBox.left)
                  .map(this.mapPopinComponents, this)
              }
            </TransitionGroup>
          </div>
        </div>
    );
  }
}
