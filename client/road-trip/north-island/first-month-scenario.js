import { Observable } from 'rxjs/Observable';

import Airport from './airport';
import Sky from './sky';
import { Marker, Coordinate, Path, AnimatedLine } from '../tools';

// DONE extraire la logique de déplacement dans une autre class trello:#66
// BACKLOG ajouter un système de déplacement automatique trello:#20
// NOTE réflexion sur le stockage du pixel ratio
export default class FirstMonthScenario {
  canvas;
  actualPointSubject;
  actualBoxesSubject;
  pixelRatio;
  airport;
  index;
  initPoint;

  // FIXME changer le nom de la variable pour être moins générique
  Markers = [
    new Marker('nh54-nh55', 705, 498, 703, 498),
    new Marker('nh55-nh56', 703, 498, 706, 504),
    new Marker('nh56-nh57', 706, 504, 714, 503)
  ];

  Roads = [
    new Marker('rnh1-rnh2', 708, 502, 705, 485),
    new Marker('rnh2-rnh3', 705, 485, 743, 548)
  ]

  Waves = [
    new Coordinate(705, 498),
    new Coordinate(703, 498),
    new Coordinate(706, 504),
    new Coordinate(714, 503),
    new Coordinate(715, 506),
    new Coordinate(703, 507),
    new Coordinate(699, 496),
    new Coordinate(705, 496),
    new Coordinate(705, 498)
  ];

  // TODO gérer le passage d'une étape à l'autre avec le scroll de la souris trello:#20
  steps = [
    // launch step
    () => {
      this.actualPointSubject.next(this.initPoint);
      this.actualBoxesSubject.next(0);
      this.airport.fliing(this.canvas, this.initPoint);
      this.sky = new Sky(this.canvas, this.initPoint);
      this.sky.launch();
    },
    // first step
    () => {
      this.actualBoxesSubject.next(1);
    },
    // second step
    () => {
      this.actualBoxesSubject.next(2);
    },
    // third step
    () => {
      const endPoint = {
        x: 708 * this.pixelRatio,
        y: 502 * this.pixelRatio
      };
      this.sky.stop();
      this.airport.landing(this.canvas, {
        x: endPoint.x - (window.innerWidth / 2),
        y: endPoint.y + (window.innerHeight / 2)
      });
      // DONE merger tout dans tools/animated-line trello:#67
      // DONE voir où conserver le point d'entrée qui est le point courant trello:#67
      const sensObservable = Observable.timer(0, 5).filter(value => value < 400).map(() => 1);
      const animatedLine = new AnimatedLine(
        new Marker('airplaneLine', this.initPoint.x, this.initPoint.y, 708 * this.pixelRatio, 502 * this.pixelRatio),
        400, sensObservable, true
      ).animate();
      animatedLine.subscribe((point) => {
        this.actualPointSubject.next(point);
        if (point.x === endPoint.x) {
          this.launchScenario();
          animatedLine.unsubscribe();
        }
      });
      this.actualBoxesSubject.next(3);
    },
    // fourth step
    // DONE ajouter la création de la route du step 4 au 5 ici trello:#20
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.Roads[0];
      const animatedLine = new AnimatedLine(
        new Marker('road1', road.begin.x * this.pixelRatio, road.begin.y * this.pixelRatio, road.end.x * this.pixelRatio, road.end.y * this.pixelRatio),
        5, sensObservable
      )
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point, this.pixelRatio)) {
          this.actualPointSubject.next(point);
        }
      });
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(4);
        } else if (road.isOn(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(-1);
        }
      });
      // BACKLOG afficher des images unique et non un path
      new Path({ fill: 'url(/images/wave.png)', 'stroke-width': 0, opacity: 0 })
        .draw(this.canvas, this.pixelRatio, this.Waves)
        .animate(2000);
      this.Markers.forEach((marker) => {
        const path = this.canvas.path(`M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio}`);
        path.animate({ path: `M${marker.begin.x * this.pixelRatio} ${marker.begin.y * this.pixelRatio} L${marker.end.x * this.pixelRatio} ${marker.end.y * this.pixelRatio}` }, 2000);
      }, this);
    },
    // fifth step
    // DOING réaliser le step 5 trello:#40
    () => {
      const sensObservable = Observable.fromEvent(window, 'wheel')
        .map(event => event.deltaY / Math.abs(event.deltaY));
      const road = this.Roads[1];
      const animatedLine = new AnimatedLine(
        new Marker('road2', road.begin.x * this.pixelRatio, road.begin.y * this.pixelRatio, road.end.x * this.pixelRatio, road.end.y * this.pixelRatio),
        5, sensObservable
      )
        .draw(this.canvas)
        .animate();
      animatedLine.subscribe((point) => {
        if (road.isOn(point, this.pixelRatio)) {
          this.actualPointSubject.next(point);
        }
      });
      this.actualPointSubject.subscribe((point) => {
        if (road.begin.isEqual(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(5);
        } else if (road.isOn(point, this.pixelRatio)) {
          this.actualBoxesSubject.next(-1);
        }
      });
    }
    // BACKLOG ajouter la sixième étape trello:#41
  ];

  constructor(canvas, pixelRatio, actualPointSubject, actualBoxesSubject) {
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.actualPointSubject = actualPointSubject;
    this.actualBoxesSubject = actualBoxesSubject;
    this.airport = new Airport();
    this.initPoint = {
      x: (708 * pixelRatio) + (window.innerWidth / 2),
      y: (502 * pixelRatio) - (window.innerHeight / 2)
    };
  }

  // BACKLOG joue l'intégralité du scénario précedent l'étape donnée en param
  launch(index) {
    this.index = index;
    this.steps[index]();
  }

  launchScenario() {
    this.steps[4]();
    this.steps[5]();
  }

  nextStep() {
    this.index += 1;
    this.steps[this.index]();
  }
}
