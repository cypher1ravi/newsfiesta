import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loader, setLoader] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/in.json`
        setLoader(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parseData = await data.json();
        props.setProgress(70)
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        props.setProgress(100)
        setLoader(false)

    }
    const fetchMoreData = async () => {
        const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/in.json`

        setPage(page + 1)
        setLoader(true)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
        setLoader(false)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstletter(props.category)} - News fiesta`
        updateNews();
    }, [])
    return (
        <>
            <h2 className="text-center text-warning my-2">Top {capitalizeFirstletter(props.category)} Headlines- News fiesta </h2>

            {loader && <Spinner />}


            <div className="album pt-2" >

                <InfiniteScroll
                    dataLength={articles.length}
                    hasMore={articles.length !== totalResults}
                    next={fetchMoreData}
                    loader={loader && <Spinner />}

                >
                    <div className="container pt-3">


                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {articles.map((e) => (

                                <div className="col" key={e.url} >
                                    <Newsitem title={(e.title ? e.title.slice(0, 30) : '....') + '...'} description={(e.description ? e.description.slice(0, 65) : '') + '...'} urlToImage={e.urlToImage} url={e.url} publishedAt={e.publishedAt} author={e.author} source={e.source.name} />

                                </div>
                            )
                            )}
                        </div>
                    </div>
                </InfiniteScroll>
            </div >
        </>
    )
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    totalResults: PropTypes.number,
};
News.defaultProps = {

    country: 'in',
    pageSize: 6,
    category: 'general'

};
