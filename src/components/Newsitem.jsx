import React from 'react'

export default function Newsitem(props) {
    let { title, description, urlToImage, url, author, publishedAt, source } = props

    return (
        <div className="card shadow-lg">
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "85%" }}> {source} </span>
            <img src={urlToImage ? urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} className="card-img-top bd-placeholder-img" alt="error" style={{ width: '100%', height: '220px', background: 'grey' }} /><span className="badge text-bg-info">{author ? author : "Unknown"}</span>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group ">
                        <a href={url} target='_blabk'> <button type="button" className="btn btn-sm btn-outline-primary ">Read more</button></a>
                    </div>
                    <small className="text-body-info"> {new Date(publishedAt).toLocaleString()}</small>
                </div>
            </div>
        </div>
    )
}
