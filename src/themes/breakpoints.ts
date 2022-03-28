export const screenTinyPortraitMin = "374px";
export const screenTinyPortraitMax = "427px";

// ##Device = Most of the Smartphones Mobiles (Portrait)
// ##Screen = B/w 320px to 479px
export const screenXsPortraitMin = "320px";
export const screenXsPortraitMax = "479px";

// ##Device = Low Resolution Tablets, Mobiles (Landscape)
// ##Screen = B/w 481px to 767px
export const screenXsLandscapeMin = "414px";
export const screenXsLandscapeMax = "896px";

// Small tablets (landscape view)]
// ##Device = Tablets, Ipads (landscape)
// ##Screen = B/w 768px to 1024px
export const screenSmLandscapeMin = "810px"
export const screenSmLandscapeMax = "1080px"

// Small tablets (portrait view)]
// ##Device = Tablets, Ipads (portrait)
// ##Screen = B/w 768px to 1024px
export const screenSmPortraitMin = "1024px"
export const screenSmPortraitMax = "1366px"

// Tablets and Small Desktops
// ##Device = Tablet, Desktops
// ##Screen = B/w 980px to 1024px
export const screenMdMin = "980px"
export const screenMdMax = "1024px"

// Large tablets and desktops
// ##Device = Laptops, Desktops
// ##Screen = B/w 1025px to 1280px
export const screenLgMin = "1025px"
export const screenLgMax = "1280px"

// Xl Large desktops
// ##Device = Desktops
// ##Screen = 1920px to higher resolution desktops
export const screenXlMin = "1920px"

export const mqTinyPortrait = () => {
  return `@media (min-width: ${screenTinyPortraitMin}) and 
    (max-width: ${screenTinyPortraitMax}) and 
    (orientation: portrait)
  `
}

export const mqXsPortrait = () => {
  return `@media (min-width: ${screenXsPortraitMin}) and 
    (max-width: ${screenXsPortraitMax}) and 
    (orientation: portrait)
  `
}

export const mqXsLandscape = () => {
  return `@media only screen and 
    (min-device-width: ${screenXsLandscapeMin}) and 
    (max-device-width: ${screenXsLandscapeMax}) and 
    (-webkit-min-device-pixel-ratio: 2) and 
    (orientation: landscape)
  `
}


export const mqSmLandscape = () => {
  return `@media (min-width: ${screenSmLandscapeMin}) and 
    (max-width: ${screenSmLandscapeMax}) and 
    (orientation: landscape)
  `
}

export const mqSmPortrait = () => {
  return `@media (min-width: ${screenSmPortraitMin}) and 
    (max-width: ${screenSmPortraitMax}) and 
    (orientation: portrait)
  `
}

export const mqSmPro = () => {
  return `@media only screen and 
    (min-width: 1024px) and 
    (max-height: 1366px) and 
    (-webkit-min-device-pixel-ratio: 1.5) 
  `
}

export const mqMd = () => {
  return `@media only screen and 
    (min-width: ${screenMdMin}) and 
    (max-height: ${screenMdMax}) and 
    (-webkit-min-device-pixel-ratio: 1.5)
  `
}

export const mqLg = () => {
  return `@media only screen and 
    (min-width: ${screenLgMin}) and 
    (max-width: ${screenLgMax}) and 
  `
}

export const mqXl = () => {
  return `@media only screen and (min-width: ${screenXlMin})`
}