import React from 'react';
import {
  RealisticWaterTransition,
  RealisticWaterTransitionProps,
} from './RealisticWaterTransition';

export type WaveRevealProps = RealisticWaterTransitionProps;

export const WaveReveal: React.FC<WaveRevealProps> = (props) => (
  <RealisticWaterTransition {...props} />
);

export { RealisticWaterTransition };
export default WaveReveal;
