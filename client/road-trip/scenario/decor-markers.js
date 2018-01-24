import { SVGImage } from '../tools';

const buildDecors = pixelRatio => ([
  [
    new SVGImage('/images/auckland-airport.svg', { x: 711, y: 499 }, { w: 114, h: 74 }, pixelRatio),
    new SVGImage('/images/ocean.svg', { x: 700, y: 502 }, { w: 90, h: 42 }, pixelRatio)
  ],
  [
    new SVGImage('/images/auckland-cbd.svg', { x: 701, y: 484 }, { w: 103, h: 166 }, pixelRatio),
    new SVGImage('/images/auckland-port.svg', { x: 708.5, y: 481.5 }, { w: 113, h: 71 }, pixelRatio),
    new SVGImage('/images/boat-nz.svg', { x: 715, y: 480 }, { w: 83, h: 95 }, pixelRatio),
    new SVGImage('/images/ocean.svg', { x: 725, y: 480 }, { w: 90, h: 42 }, pixelRatio)
  ],
  [
    new SVGImage('/images/lake.svg', { x: 748, y: 552 }, { w: 106, h: 134 }, pixelRatio),
    new SVGImage('/images/rugby-tekauwhata.svg', { x: 745.5, y: 544.5 }, { w: 60, h: 90 }, pixelRatio)
  ],
  [
    new SVGImage('/images/hills.svg', { x: 790, y: 640 }, { w: 225, h: 54 }, pixelRatio),
    new SVGImage('/images/hills.svg', { x: 772, y: 648 }, { w: 225, h: 54 }, pixelRatio)
  ]
]);

export default buildDecors;
