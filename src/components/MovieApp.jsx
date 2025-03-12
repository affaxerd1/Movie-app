import React from 'react'

const MovieApp = ({movie : {title, vote_average,original_language,  poster_path, release_date} }) => {
  return (
    <div>
        <div className='movie-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/No-Poster.png`}  alt="" />
        </div>
        
        <div className='mt-4'>
            <p className='text-white'>{title}</p>
            <div className='content'>
                <div className='rating  flex items-center space-x-2'>
                    <img src="Rating.svg" alt="Star Icon" />
                    <p className='text-white'>	&#8226;</p>
                    <p className='text-white'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    <p className='text-white'>	&#8226;</p>
                    <p className='lang text-white'>{original_language}</p>
                    <span className='text-white'>&#8226;</span>
                    <p className='date text-white'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>



{/* stuck at vote average not s */}
                </div>
                
                <span>•</span>
            </div>
        </div>

    </div>

    
  )
}

export default MovieApp