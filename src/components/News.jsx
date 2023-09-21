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
    const [errorMessage, setErrorMessage] = useState(null);


    const capitalizeFirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const updateNews = async () => {
        try {
            props.setProgress(10);
            // this is valid for only local host
            // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=02fcaf7b762b4446ba95145a048d7405&page=${page}&pageSize=${props.pageSize}`;
            const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/${props.country}.json`
            setLoader(true);

            let data = await fetch(url);
            if (!data.ok) {
                throw new Error('Page not found');

            }
            props.setProgress(30);

            let parseData = await data.json();
            props.setProgress(70);
            setArticles(parseData.articles);
            setTotalResults(parseData.totalResults);
            props.setProgress(100);
            setLoader(false);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('An error occurred while fetching news: ' + error.message);
            setLoader(false);
            props.setProgress(100);

        }
    };

    const fetchMoreData = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=02fcaf7b762b4446ba95145a048d7405&page=${page + 1}&pageSize=${props.pageSize}`;

        // setPage(page + 1)
        // setLoader(true)
        // let data = await fetch(url);
        // let parseData = await data.json();
        // setArticles(articles.concat(parseData.articles))
        // setTotalResults(parseData.totalResults)
        // setLoader(false)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstletter(props.category)} - News fiesta`
        updateNews();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <h2 className="text-center text-warning my-2">Top {capitalizeFirstletter(props.category)} Headlines- News fiesta </h2>
            {loader && <Spinner />}
            {errorMessage && (
                <div className="error-message">
                    <h6 className="text-center text-danger my-2"> {errorMessage}</h6>
                </div>
            )}


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
