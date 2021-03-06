import { OrientedVector, SVGLine } from '../tools';

/* eslint-disable */
const OrientedVectors = [
  new OrientedVector('nh1-nh2', 499, 205, 541, 205),
  new OrientedVector('nh2-nh3', 541, 205, 540, 230),
  new OrientedVector('nh3-nh4', 540, 230, 563, 259),
  new OrientedVector('nh4-nh5', 563, 259, 558, 269),
  new OrientedVector('nh5-nh6', 558, 269, 565, 272),
  new OrientedVector('nh6-nh7', 565, 272, 568, 263),
  new OrientedVector('nh7-nh8', 568, 263, 564, 254),
  new OrientedVector('nh8-nh9', 564, 254, 579, 249),
  new OrientedVector('nh9-nh10', 579, 249, 582, 255),
  new OrientedVector('nh10-nh11', 582, 255, 579, 264),
  new OrientedVector('nh11-nh12', 579, 264, 626, 276),
  new OrientedVector('nh12-nh13', 626, 276, 649, 289),
  new OrientedVector('nh13-nh14', 649, 289, 641, 293),
  new OrientedVector('nh14-nh15', 641, 293, 649, 298),
  new OrientedVector('nh15-nh64', 649, 298, 666, 289),
  new OrientedVector('nh16-nh17', 666, 289, 664, 304),
  new OrientedVector('nh17-nh18', 664, 304, 697, 375),
  new OrientedVector('nh18-nh19', 697, 375, 666, 359),
  new OrientedVector('nh19-nh20', 666, 359, 679, 371),
  new OrientedVector('nh20-nh21', 679, 371, 679, 382),
  new OrientedVector('nh21-nh22', 679, 382, 710, 415),
  new OrientedVector('nh22-nh23', 710, 415, 715, 431),
  new OrientedVector('nh23-nh24', 715, 431, 701, 455),
  new OrientedVector('nh30-nh31', 771, 524, 767, 484),
  new OrientedVector('nh31-nh32', 767, 484, 770, 474),
  new OrientedVector('nh32-nh33', 770, 474, 754, 442),
  new OrientedVector('nh33-nh34', 754, 442, 773, 441),
  new OrientedVector('nh34-nh35', 773, 441, 790, 470),
  new OrientedVector('nh35-nh36', 790, 470, 812, 494),
  new OrientedVector('nh36-nh37', 812, 494, 816, 548),
  new OrientedVector('nh1-nh38', 499, 205, 553, 281),
  new OrientedVector('nh38-nh39', 553, 281, 545, 300),
  new OrientedVector('nh39-nh40', 545, 300, 635, 421),
  new OrientedVector('nh40-nh41', 635, 421, 639, 436),
  new OrientedVector('nh41-nh42', 639, 436, 652, 430),
  new OrientedVector('nh42-nh43', 652, 430, 631, 398),
  new OrientedVector('nh43-nh44', 631, 398, 660, 418),
  new OrientedVector('nh44-nh45', 660, 418, 660, 431),
  new OrientedVector('nh45-nh46', 660, 431, 673, 428),
  new OrientedVector('nh46-nh47', 673, 428, 675, 459),
  new OrientedVector('nh47-nh48', 675, 459, 657, 437),
  new OrientedVector('nh48-nh49', 657, 437, 648, 441),
  new OrientedVector('nh37-nh65', 816, 548, 834, 573),
  new OrientedVector('nh65-nh66', 834, 573, 886, 602),
  new OrientedVector('nh66-nh67', 886, 602, 931, 616),
  new OrientedVector('nh67-nh68', 931, 616, 947, 616),
  new OrientedVector('nh68-nh69', 947, 616, 962, 603),
  new OrientedVector('nh69-nh70', 962, 603, 977, 584),
  new OrientedVector('nh70-nh71', 977, 584, 1006, 566),
  new OrientedVector('nh71-nh72', 1006, 566, 1057, 580),
  new OrientedVector('nh72-nh73', 1057, 580, 1054, 590),
  new OrientedVector('nh73-nh74', 1054, 590, 1035, 625),
  new OrientedVector('nh74-nh75', 1035, 625, 1030, 677),
  new OrientedVector('nh75-nh76', 1030, 677, 1016, 697),
  new OrientedVector('nh76-nh77', 1016, 697, 996, 704),
  new OrientedVector('nh77-nh78', 996, 704, 988, 740),
  new OrientedVector('nh78-nh79', 988, 740, 999, 749),
  new OrientedVector('nh79-nh80', 999, 749, 985, 771),
  new OrientedVector('nh80-nh81', 985, 771, 980, 745),
  new OrientedVector('nh81-nh82', 980, 745, 945, 742),
  new OrientedVector('nh82-nh83', 945, 742, 925, 750),
  new OrientedVector('nh83-nh84', 925, 750, 897, 779),
  new OrientedVector('nh84-nh85', 897, 779, 901, 790),
  new OrientedVector('nh85-nh86', 901, 790, 903, 804),
  new OrientedVector('nh86-nh87', 903, 804, 918, 808),
  new OrientedVector('nh87-nh88', 918, 808, 910, 817),
  new OrientedVector('nh88-nh89', 910, 817, 907, 831),
  new OrientedVector('nh89-nh112', 907, 831, 896, 857),
  new OrientedVector('nh112-nh113', 896, 857, 866, 907),
  new OrientedVector('nh113-nh114', 866, 907, 851, 922),
  new OrientedVector('nh114-nh115', 851, 922, 835, 958),
  new OrientedVector('nh115-nh116', 835, 958, 805, 1002),
  new OrientedVector('nh116-nh117', 805, 1002, 758, 1035),
  new OrientedVector('nh117-nh118', 758, 1035, 747, 1036),
  new OrientedVector('nh118-nh119', 747, 1036, 742, 1013)
];
/* eslint-enable */

const buildCoastlines = pixelRatio => ([
  [
    new SVGLine('nh54-nh55', 705, 498, 703, 498, pixelRatio),
    new SVGLine('nh55-nh56', 703, 498, 706, 504, pixelRatio),
    new SVGLine('nh56-nh57', 706, 504, 714, 503, pixelRatio)
  ],
  [
    new SVGLine('nh49-nh50', 648, 441, 681, 506, pixelRatio),
    new SVGLine('nh50-nh51', 681, 506, 690, 502, pixelRatio),
    new SVGLine('nh51-nh52', 690, 502, 695, 497, pixelRatio),
    new SVGLine('nh52-nh53', 695, 497, 705, 495, pixelRatio),
    new SVGLine('nh53-nh54', 705, 495, 705, 498, pixelRatio),
    new SVGLine('nh57-nh58', 714, 503, 717, 508, pixelRatio),
    new SVGLine('nh24-nh25', 701, 455, 714, 478, pixelRatio),
    new SVGLine('nh25-nh26', 714, 478, 695, 482, pixelRatio),
    new SVGLine('nh26-nh27', 695, 482, 717, 484, pixelRatio),
    new SVGLine('nh27-nh28', 717, 484, 755, 499, pixelRatio)
  ],
  [
    new SVGLine('nh28-nh29', 755, 499, 760, 525, pixelRatio),
    new SVGLine('nh29-nh30', 760, 525, 771, 524, pixelRatio),
    new SVGLine('nh58-nh59', 717, 508, 699, 516, pixelRatio),
    new SVGLine('nh59-nh60', 699, 516, 697, 512, pixelRatio),
    new SVGLine('nh60-nh61', 697, 512, 695, 504, pixelRatio),
    new SVGLine('nh61-nh62', 695, 504, 682, 508, pixelRatio),
    new SVGLine('nh62-nh63', 682, 508, 683, 517, pixelRatio),
    new SVGLine('nh63-nh90', 683, 517, 709, 589, pixelRatio)
  ],
  [
    new SVGLine('nh90-nh91', 709, 589, 705, 604, pixelRatio),
    new SVGLine('nh91-nh92', 705, 604, 705, 625, pixelRatio),
    new SVGLine('nh92-nh93', 705, 625, 709, 626, pixelRatio),
    new SVGLine('nh93-nh94', 709, 626, 716, 622, pixelRatio),
    new SVGLine('nh94-nh95', 716, 622, 720, 627, pixelRatio),
    new SVGLine('nh95-nh96', 720, 627, 711, 632, pixelRatio),
    new SVGLine('nh96-nh97', 711, 632, 705, 629, pixelRatio),
    new SVGLine('nh97-nh98', 705, 629, 698, 629, pixelRatio),
    new SVGLine('nh98-nh99', 698, 629, 700, 653, pixelRatio),
    new SVGLine('nh99-nh100', 700, 653, 693, 662, pixelRatio)
  ],
  [
    new SVGLine('lt1-lt2', 799, 696, 824, 698, pixelRatio),
    new SVGLine('lt2-lt3', 824, 698, 824, 708, pixelRatio),
    new SVGLine('lt3-lt4', 824, 708, 800, 728, pixelRatio),
    new SVGLine('lt4-lt1', 800, 728, 799, 696, pixelRatio)
  ],
  [
    new SVGLine('nh100-nh101', 693, 662, 689, 711, pixelRatio),
    new SVGLine('nh101-nh102', 689, 711, 673, 729, pixelRatio),
    new SVGLine('nh102-nh103', 673, 729, 659, 730, pixelRatio),
    new SVGLine('nh103-nh104', 659, 730, 640, 738, pixelRatio),
    new SVGLine('nh104-nh105', 640, 738, 615, 758, pixelRatio),
    new SVGLine('nh105-nh106', 615, 758, 615, 777, pixelRatio),
    new SVGLine('nh106-nh107', 615, 777, 631, 795, pixelRatio),
    new SVGLine('nh107-nh108', 631, 795, 664, 807, pixelRatio),
    new SVGLine('nh108-nh109', 664, 807, 678, 823, pixelRatio),
    new SVGLine('nh109-nh110', 678, 823, 702, 834, pixelRatio),
    new SVGLine('nh110-nh111', 702, 834, 717, 835, pixelRatio),
    new SVGLine('nh111-nh121', 717, 835, 740, 862, pixelRatio)
  ],
  [
    new SVGLine('nh121-nh122', 740, 862, 746, 877, pixelRatio),
    new SVGLine('nh122-nh123', 746, 877, 741, 923, pixelRatio)
  ],
  [
    new SVGLine('nh123-nh124', 741, 923, 719, 965, pixelRatio)
  ],
  [
    new SVGLine('nh124-nh125', 719, 965, 694, 1000, pixelRatio)
  ],
  [
    new SVGLine('nh125-nh126', 694, 1000, 705, 1008, pixelRatio),
    new SVGLine('nh126-nh127', 705, 1008, 714, 1001, pixelRatio),
    new SVGLine('nh127-nh128', 714, 1001, 713, 994, pixelRatio),
    new SVGLine('nh128-nh129', 713, 994, 719, 993, pixelRatio),
    new SVGLine('nh129-nh130', 719, 993, 715, 1006, pixelRatio),
    new SVGLine('nh130-nh120', 715, 1006, 719, 1014, pixelRatio),
    new SVGLine('nh119-nh120', 742, 1013, 719, 1014, pixelRatio)
  ]
]);

export default buildCoastlines;
