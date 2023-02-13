declare module '*.svg?url' {
  const content: any;
  export default content;
}
declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// declare module '*.svg?svgr' {
//   import type { ComponentType, SVGProps } from 'react';

//   type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

//   const Svg: SvgComponent;

//   export = Svg;
// }
