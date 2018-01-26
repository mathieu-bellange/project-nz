import { SVGImage, SVGText } from '../tools';

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
  ],
  [
    new SVGImage('/images/lake-maraetai.svg', { x: 803, y: 667 }, { w: 234, h: 210 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 810, y: 650 }, { w: 255, h: 182 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 835, y: 675 }, { w: 255, h: 182 }, pixelRatio)
  ],
  [
    new SVGImage('/images/ligth-mountain.svg', { x: 840, y: 705 }, { w: 255, h: 182 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 825, y: 725 }, { w: 255, h: 182 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 810, y: 688 }, { w: 255, h: 182 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 790, y: 710 }, { w: 255, h: 182 }, pixelRatio),
    new SVGImage('/images/water-skiing.svg', { x: 805, y: 700 }, { w: 111, h: 24 }, pixelRatio),
    new SVGImage('/images/fishing-boat.svg', { x: 818, y: 702 }, { w: 68, h: 29 }, pixelRatio),
    new SVGImage('/images/fish.svg', { x: 806, y: 714 }, { w: 69, h: 41 }, pixelRatio),
    new SVGText('Lake Taupo', { x: 811, y: 706 }, 46, pixelRatio)
  ]
]);

export default buildDecors;
