import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Head from '../components/base/Head';
import PageContent from '../components/PageContent';

const App = (props) => {
    const [isLoading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', stopLoading);

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
                    props.posts.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {/* TODO: Check if its a link */}
                            <td>
                                <a href={user.job_offers[user.job_offers.length - 1].user_offer.company} type="button" className="btn btn-danger waves-effect waves-light waves-round" target="_blank">
                                    <i className="icon md-link" aria-hidden="true"></i> Link
                              </a>
                            </td>

                            <td>
                                <span className="badge badge-primary">Un mejor empleo</span>
                            </td>
                            <td> {user.job_offers[user.job_offers.length - 1].user_offer.emailSentAt} </td>
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
            <PageContent users={content} pagination={paginationContent} />
            <Footer />
        </div>
    );
};

App.getInitialProps = async ({ query }) => {
    const page = query.page || 1;
    const res = await fetch(`http://localhost:4000/api/users/${page}`);
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
