import { SVGImage } from '../tools';

const buildDecors = pixelRatio => ([
  [
    new SVGImage('/images/auckland-airport.svg', { x: 710, y: 498 }, { w: 127, h: 82 }, pixelRatio)
  ],
  [
    new SVGImage('/images/auckland-cbd.svg', { x: 702, y: 486 }, { w: 103, h: 166 }, pixelRatio),
    new SVGImage('/images/auckland-port.svg', { x: 708, y: 482 }, { w: 113, h: 71 }, pixelRatio),
    new SVGImage('/images/boat-nz.svg', { x: 715, y: 480 }, { w: 83, h: 95 }, pixelRatio)
  ]
]);

export default buildDecors;
