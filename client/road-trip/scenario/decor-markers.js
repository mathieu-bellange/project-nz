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
    new SVGImage('/images/lake-maraetai.svg', { x: 803, y: 667 }, { w: 211, h: 189 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 810, y: 650 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 835, y: 675 }, { w: 207, h: 148 }, pixelRatio)
  ],
  [
    new SVGImage('/images/ligth-mountain.svg', { x: 840, y: 705 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 825, y: 725 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 810, y: 688 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 790, y: 710 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/water-skiing.svg', { x: 805, y: 700 }, { w: 165, h: 32 }, pixelRatio),
    new SVGImage('/images/fishing-boat.svg', { x: 818, y: 701.5 }, { w: 99, h: 43 }, pixelRatio),
    new SVGImage('/images/fish.svg', { x: 806, y: 714 }, { w: 92, h: 55 }, pixelRatio),
    new SVGText('Lake Taupo', { x: 811, y: 706 }, 46, pixelRatio)
  ],
  [
    new SVGImage('/images/ligth-mountain.svg', { x: 815, y: 738 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/umukarikari.svg', { x: 808, y: 750 }, { w: 157, h: 78 }, pixelRatio)
  ],
  [
    new SVGImage('/images/volcano-tongariro-ngauruhoe.svg', { x: 789, y: 750 }, { w: 332, h: 156 }, pixelRatio),
    new SVGImage('/images/gollum-waterfall.svg', { x: 772, y: 748 }, { w: 96, h: 71 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 780, y: 732 }, { w: 207, h: 148 }, pixelRatio)
  ],
  [
    new SVGImage('/images/ligth-mountain.svg', { x: 755, y: 753 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/volcano-ruapehu.svg', { x: 780, y: 765 }, { w: 417, h: 249 }, pixelRatio)
  ],
  [
    new SVGImage('/images/ruatiti.svg', { x: 738, y: 758 }, { w: 150, h: 116 }, pixelRatio),
    new SVGImage('/images/ruatiti-valley.svg', { x: 753, y: 768 }, { w: 142, h: 88 }, pixelRatio)
  ],
  [
    new SVGImage('/images/ligth-mountain.svg', { x: 745, y: 790 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 762, y: 800 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 748, y: 815 }, { w: 207, h: 148 }, pixelRatio)
  ],
  [
    new SVGImage('/images/wanganui.svg', { x: 728, y: 840 }, { w: 78, h: 92 }, pixelRatio),
    new SVGImage('/images/windy-beach.svg', { x: 732, y: 849 }, { w: 97, h: 57 }, pixelRatio),
    new SVGImage('/images/tamariki.svg', { x: 738, y: 849 }, { w: 114, h: 34 }, pixelRatio),
    new SVGImage('/images/ocean.svg', { x: 723, y: 848 }, { w: 90, h: 42 }, pixelRatio)
  ],
  [
    new SVGImage('/images/himatangi-beach.svg', { x: 747.5, y: 889.5 }, { w: 88, h: 118 }, pixelRatio),
    new SVGImage('/images/w-beach.svg', { x: 746, y: 903 }, { w: 89, h: 52 }, pixelRatio),
    new SVGImage('/images/ocean.svg', { x: 738, y: 895 }, { w: 90, h: 42 }, pixelRatio)
  ],
  [
    new SVGImage('/images/ligth-mountain.svg', { x: 760, y: 925 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/ligth-mountain.svg', { x: 750, y: 940 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/w-beach.svg', { x: 744.5, y: 918 }, { w: 89, h: 52 }, pixelRatio),
    new SVGImage('/images/w-beach.svg', { x: 736.5, y: 937 }, { w: 89, h: 52 }, pixelRatio),
    new SVGImage('/images/ocean.svg', { x: 730, y: 928 }, { w: 90, h: 42 }, pixelRatio)
  ],
  [
    new SVGImage('/images/ligth-mountain.svg', { x: 730, y: 967 }, { w: 207, h: 148 }, pixelRatio),
    new SVGImage('/images/w-beach.svg', { x: 728.5, y: 952 }, { w: 89, h: 52 }, pixelRatio),
    new SVGImage('/images/kapiti-island.svg', { x: 714, y: 946 }, { w: 270, h: 99 }, pixelRatio)
  ],
  [
    new SVGImage('/images/wellington.svg', { x: 705, y: 1000 }, { w: 112, h: 84 }, pixelRatio),
    new SVGImage('/images/ocean.svg', { x: 697, y: 978 }, { w: 90, h: 42 }, pixelRatio),
    new SVGImage('/images/ocean.svg', { x: 710, y: 1015 }, { w: 90, h: 42 }, pixelRatio)
  ],
  [
    new SVGImage('/images/road-to-rivendell.svg', { x: 752, y: 960 }, { w: 411, h: 153 }, pixelRatio)
  ],
  [
    new SVGImage('/images/rivendell.svg', { x: 743, y: 971 }, { w: 79, h: 112 }, pixelRatio)
  ]
]);

export default buildDecors;
