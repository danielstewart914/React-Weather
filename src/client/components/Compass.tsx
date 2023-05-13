import blankCompassImage from '../assets/images/Blank-Compass.svg';
import { styled } from 'styled-components';

interface Props {
	rotationInDeg?: number;
	size: number;
}

const Pointer = styled.div<Props>`
	width: 0;
  height: 0;
  position: absolute;
  border: ${props => props.size}rem solid transparent;
  border-bottom: ${props => props.size * 8}rem solid red;
  top: ${props => props.size}rem;
  left: calc( 50% - ${props => props.size}rem );
  transform-origin: bottom;
  animation: pointerAnimation 4s ease-in-out infinite;
	rotate: ${props => props.rotationInDeg}deg;

	&::after {
		content: '';
		bottom: ${props => props.size * 8 * -1}rem;
		border: ${props => props.size}rem solid transparent;
		border-bottom: ${props => props.size * 8}rem solid #dfe;
		position: absolute;
		right: ${props => props.size * -1}rem;
		transform-origin: bottom;
		rotate:180deg;
	}
	
	@keyframes pointerAnimation {
  0% { transform: rotate(0deg); }
  40% { transform: rotate(2deg); }
  50% { transform: rotate(4deg); }
  65% { transform: rotate(-2deg); }
  90% { transform: rotate(-4deg); }
  100% { transform: rotate(0deg); }
}
`;

const CompassContainer = styled.div<Props>`
	position: relative;
  width: ${props => props.size * 20}rem;
  height: ${props => props.size * 20}rem;

	img {
		width: 100%;
		height: 100%;
	}

	/* Pivot */
	&::after {
		content: '';
		position: absolute;
		background: #000;
		border-radius: 100%;
		left: calc( 50% - ${props => props.size / 2}rem);
  	top: calc( 50% - ${props => props.size / 2}rem);
		width: ${props => props.size}rem;
		height: ${props => props.size}rem;
	}
`;

const Compass = ({ rotationInDeg, size = 1 }:Props) => {
	return (
		<CompassContainer size={size}>
			<img src={blankCompassImage} />
			<Pointer size={size} rotationInDeg={rotationInDeg} />
		</CompassContainer>
	);
};

export default Compass;
