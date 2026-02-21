import homagBrand from '@/data/images/sliders/smooth/brands/homag.svg';
import burkleBrand from '@/data/images/sliders/smooth/brands/burkle.svg';
import weekeBrand from '@/data/images/sliders/smooth/brands/weeke.svg';
import eggerBrand from '@/data/images/sliders/smooth/brands/egger.svg';
import extravertBrand from '@/data/images/sliders/smooth/brands/extravert.png';
import lamartyBrand from '@/data/images/sliders/smooth/brands/lamarty.png';
import kronospanBrand from '@/data/images/sliders/smooth/brands/kronospan.svg';
import arpaBrand from '@/data/images/sliders/smooth/brands/arpa.svg';
import lamicolorBrand from '@/data/images/sliders/smooth/brands/lamicolor.png';
import cleafBrand from '@/data/images/sliders/smooth/brands/cleaf.svg';
import formicaBrand from '@/data/images/sliders/smooth/brands/formica.svg';
import candyBrand from '@/data/images/sliders/smooth/brands/candy.svg';
import kortingBrand from '@/data/images/sliders/smooth/brands/korting.png';
import smegBrand from '@/data/images/sliders/smooth/brands/smeg.svg';
import liebherrBrand from '@/data/images/sliders/smooth/brands/liebherr.png';

import firstSlider1 from '@/data/images/sliders/smooth/first/1.png';
import firstSlider2 from '@/data/images/sliders/smooth/first/2.png';
import firstSlider3 from '@/data/images/sliders/smooth/first/3.png';
import firstSlider4 from '@/data/images/sliders/smooth/first/4.png';
import firstSlider5 from '@/data/images/sliders/smooth/first/5.png';

import secondSlider1 from '@/data/images/sliders/smooth/second/1.png';
import secondSlider2 from '@/data/images/sliders/smooth/second/2.png';
import secondSlider3 from '@/data/images/sliders/smooth/second/3.png';
import secondSlider4 from '@/data/images/sliders/smooth/second/4.png';
import secondSlider5 from '@/data/images/sliders/smooth/second/5.png';

import thirdSlider1 from '@/data/images/sliders/smooth/third/1.png';
import thirdSlider2 from '@/data/images/sliders/smooth/third/2.png';
import thirdSlider3 from '@/data/images/sliders/smooth/third/3.png';
import thirdSlider4 from '@/data/images/sliders/smooth/third/4.png';
import thirdSlider5 from '@/data/images/sliders/smooth/third/5.png';

import fourthSlider1 from '@/data/images/sliders/smooth/fourth/1.jpg';
import fourthSlider2 from '@/data/images/sliders/smooth/fourth/2.jpg';
import fourthSlider3 from '@/data/images/sliders/smooth/fourth/3.png';
import fourthSlider4 from '@/data/images/sliders/smooth/fourth/4.jpg';
import fourthSlider5 from '@/data/images/sliders/smooth/fourth/5.jpg';

import fifthSlider1 from '@/data/images/sliders/smooth/fifth/1.png';
import fifthSlider2 from '@/data/images/sliders/smooth/fifth/2.png';
import fifthSlider3 from '@/data/images/sliders/smooth/fifth/3.png';
import fifthSlider4 from '@/data/images/sliders/smooth/fifth/4.png';
import fifthSlider5 from '@/data/images/sliders/smooth/fifth/5.png';

import sixthSlider1 from '@/data/images/sliders/smooth/sixth/1.png';
import sixthSlider2 from '@/data/images/sliders/smooth/sixth/2.png';
import sixthSlider3 from '@/data/images/sliders/smooth/sixth/3.png';
import sixthSlider4 from '@/data/images/sliders/smooth/sixth/4.png';
import sixthSlider5 from '@/data/images/sliders/smooth/sixth/5.png';
import {TImage} from "@/types/IImage";

interface IBrands {
    homag: TImage;
    burkle: TImage;
    weeke: TImage;
    egger: TImage;
    extravert: TImage;
    lamarty: TImage;
    kronospan: TImage;
    arpa: TImage;
    lamicolor: TImage;
    cleaf: TImage;
    formica: TImage;
    candy: TImage;
    korting: TImage;
    smeg: TImage;
    liebherr: TImage;
}

export const brands: IBrands = {
    homag: homagBrand,
    burkle: burkleBrand,
    weeke: weekeBrand,
    egger: eggerBrand,
    extravert: extravertBrand,
    lamarty: lamartyBrand,
    kronospan: kronospanBrand,
    arpa: arpaBrand,
    lamicolor: lamicolorBrand,
    cleaf: cleafBrand,
    formica: formicaBrand,
    candy: candyBrand,
    korting: kortingBrand,
    smeg: smegBrand,
    liebherr: liebherrBrand,
};

export const firstSlider: TImage[] = [
    firstSlider1, firstSlider2, firstSlider3, firstSlider4, firstSlider5
];

export const secondSlider: TImage[] = [
    secondSlider1, secondSlider2, secondSlider3, secondSlider4, secondSlider5
];

export const thirdSlider: TImage[] = [
    thirdSlider1, thirdSlider2, thirdSlider3, thirdSlider4, thirdSlider5
];

export const fourthSlider: TImage[] = [
    fourthSlider1, fourthSlider2, fourthSlider3, fourthSlider4, fourthSlider5
];

export const fifthSlider: TImage[] = [
    fifthSlider1, fifthSlider2, fifthSlider3, fifthSlider4, fifthSlider5
];

export const sixthSlider: TImage[] = [
    sixthSlider1, sixthSlider2, sixthSlider3, sixthSlider4, sixthSlider5
];