function Banner({tvSeies}) {
    return(
            <>
                <div className="shows-img">
                    <img src={tvSeies?.img} className="w-100" alt=""/>
                    <div className="shows-content">
                        <h4 className="text-white mb-1">{tvSeies?.name}</h4>
                        <div className="movie-time d-flex align-items-center">
                            <div className="badge badge-secondary p-1 mr-2">18+</div>
                            <span className="text-white">{tvSeies?.listSeason.length} Seasons</span>
                        </div>
                    </div>
                </div>
            </>

    )
}
export default Banner;