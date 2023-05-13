import blankCompassImage from '../assets/images/Blank-Compass.svg';
import { styled } from 'styled-components';

interface Props {
	rotation: number;
	size: number;
}

interface ContainerProps {
	size: number;
}

interface PointerProps {
	size: number;
	rotation: number;
}

const Pointer = styled.div<PointerProps>`
	width: 0;
  height: 0;
  position: absolute;
  border: ${props => props.size / 4}px solid transparent;
  border-bottom: ${props => props.size * 2}px solid red;
  top: ${props => props.size / 4}px;
  left: calc( 50% - ${props => props.size / 4}px );
  transform-origin: bottom;
  animation: pointerAnimation 4s ease-in-out infinite;
	rotate: ${props => props.rotation}deg;

	&::after {
		content: '';
		bottom: ${props => props.size * 2 * -1}px;
		border: ${props => props.size / 4}px solid transparent;
		border-bottom: ${props => props.size * 2}px solid #dfe;
		position: absolute;
		right: ${props => props.size / 4 * -1}px;
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

const CompassContainer = styled.div<ContainerProps>`
	position: relative;
  width: ${props => props.size * 5}px;
  height: ${props => props.size * 5}px;
	margin: ${props => props.size}px;

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
		left: calc( 50% - ${props => props.size / 8}px);
  	top: calc( 50% - ${props => props.size / 8}px);
		width: ${props => props.size / 4}px;
		height: ${props => props.size / 4}px;
	}
`;

const Compass = ({ rotation, size }:Props) => {
	return (
		<CompassContainer size={size}>
			<img src={blankCompassImage} />
			<Pointer size={size} rotation={rotation} />
		</CompassContainer>
	);
};

export default Compass;
