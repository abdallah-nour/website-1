import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from '@emotion/styled';

import { Container } from '../components/commonStyles';
import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogContainer = styled.div`
  padding: 4rem 0;
  .blog-content {
    margin: 2rem 0;
  }
`;

const PreviousNextContainer = styled.ul`
  list-style: none;
  margin-left: 0;
  margin-top: 2rem;
  display: flex;
  li {
    border-radius: 5px;
    transition: all 0.3s linear;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: rgba(54, 91, 155, 0.1) 0px 18px 35px,
      rgba(0, 0, 0, 0.07) 0px 8px 15px;
    width: calc(50%);
    padding: 1rem;
    margin-bottom: 0;
    &:first-child {
      text-align: left;
      margin-right: 10px;
    }
    &:last-child {
      text-align: right;
      margin-left: 10px;
    }
  }
`;

const GITHUB_USERNAME = 'learnwithparam';
const GITHUB_REPO_NAME = 'website';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    const slug = post.fields.slug;
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/content${slug}index.md`;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Header />
        <BlogContainer>
          <Container>
            <h1>{post.frontmatter.title}</h1>
            <small>{post.frontmatter.date}</small>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <a href={editUrl} target="_blank" rel="noopener noreferrer">
              Edit on GitHub
            </a>

            <PreviousNextContainer>
              {previous && (
                <li>
                  <h5>Previous Article</h5>
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                </li>
              )}
              {next && (
                <li>
                  <h5>Next Article</h5>
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                </li>
              )}
            </PreviousNextContainer>
          </Container>
        </BlogContainer>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`;
