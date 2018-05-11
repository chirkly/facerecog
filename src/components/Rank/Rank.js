import React from 'react'

const Rank = ({name, entries, setRank}) => {
	return(
		<div>
			<div className='white f3'>
				{`${name} , your current entry count is...`}
			</div>
			<div className='white f1'>
				{entries}
			</div>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<p onClick={() => setRank('rankreset')} className='f5 link dim white underline pointer'>Reset Rank</p>
			</div>	
		</div>
	)
}

export default Rank