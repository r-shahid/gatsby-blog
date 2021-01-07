import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
	// if (post !== null){
		console.log(post)
		return(
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title={post.frontmatter.title}
					description={post.frontmatter.description || post.excerpt}
				/>
				<article
					className={`post-content ${post.frontmatter.thumbnail ||
						`no-image`}`}>
					<header className='post-content-header'>
						<h1 className='post-content-title'>{post.frontmatter.title}</h1>
						<p className='post-content-date'>{post.frontmatter.date}</p>
					</header>

					{post.frontmatter.description && (
						<p className='post-content-excerpt'>
							{post.frontmatter.description}
						</p>
					)}

					{post.frontmatter.thumbnail && (
						<div className='post-content-image'>
							<Img
								className='kg-image'
								fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
								alt={post.frontmatter.title}
							/>
						</div>
					)}

					<div
						className='post-content-body'
						dangerouslySetInnerHTML={{ __html: post.html }}
					/>

					<footer className='post-content-footer'>
						<Bio />
					</footer>
				</article>
			</Layout>
		);
					// } else return null
  }

}

export default BlogPostTemplate

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
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
