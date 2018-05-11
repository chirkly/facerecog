import React from 'react'
import Tilt from 'react-tilt'
import imageLogo from './logo.png'
import './Logo.css';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa2"> 
 					<img style={{paddingTop: '2px'}} alt='logo' src={imageLogo}/> 
 				</div>
			</Tilt>
		{/*<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>*/}
		</div>
	)
}

export default Logo