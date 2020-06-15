import React, { useState, useEffect, useCallback } from 'react';
import fetch from 'isomorphic-fetch';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Head from '../components/base/Head';
import PageContent from '../components/PageContent';

const HOST_API = process.env.HOST_API || 'localhost'

const App = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [count, setCount] = useState({ count: {} })
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const fetchCounterData = useCallback(async () => {
        const res = await fetch(`http://${HOST_API}:4000/api/countdata`);
        const data = await res.json();
        setCount(data);
    }, [])

    useEffect(() => {
        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', stopLoading);
        fetchCounterData()

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
    }, [])

    const paginationHandler = (page) => {
        const currentPath = props.router.pathname;
        const currentQuery = { ...props.router.query };
        currentQuery.page = page.selected + 1;

        props.router.push({
            pathname: currentPath,
            query: currentQuery,
        });

    };

    let content = null;
    if (isLoading)
        content = <div>Loading...</div>;
    else {
        content = (
            <tbody>
                {
                    props.posts.map((userObj, index) => (
                        <tr key={index}>
                            <td>{userObj.user.name}</td>
                            <td>{userObj.userEmail}</td>
                            <td>{userObj.job_offer.name}</td>
                            {/* TODO: Check if its a link */}
                            <td>
                                <a href={userObj.company} type="button" className="btn btn-danger waves-effect waves-light waves-round" target="_blank">
                                    <i className="icon md-link" aria-hidden="true"></i> Link
                              </a>
                            </td>

                            <td>
                                <span className="badge badge-primary">{userObj.job_offer.job_provider.name}</span>
                            </td>
                            <td> {new Date(userObj.emailSentAt).toUTCString()} </td>
                        </tr>
                    ))
                }
            </tbody>
        );
    }

    let paginationContent = (
        <div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                containerClassName={'pagination justify-content-end'}
                subContainerClassName={'pages pagination'}
                activeLinkClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                previousLinkClassName={'page-link custom-page-link'}
                nextLinkClassName={'page-link custom-page-link'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link custom-page-link'}
                initialPage={props.currentPage - 1}
                pageCount={props.pageCount} //page count
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={paginationHandler}


            />
        </div>
    )

    return (
        <div>
            <Head />
            <Header />
            <PageContent users={content} pagination={paginationContent} counter={count} />
            <Footer />
        </div>
    );
};

App.getInitialProps = async ({ query }) => {
    const page = query.page || 1;
    const res = await fetch(`http://${HOST_API}:4000/api/useroffer/${page}`);
    const posts = await res.json();
    return {
        totalCount: posts._meta.totalCount,
        pageCount: posts._meta.pageCount,
        currentPage: posts._meta.currentPage,
        perPage: posts._meta.perPage,
        posts: posts.result,
        isLoading: false,
    };
}


export default withRouter(App);
