import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

import "../style/normalize.css"
import "../style/all.scss"

const AllBlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  let allpostCounter = 0

  return (
		<Layout title={siteTitle}>
			<SEO
				title='All Posts'
				keywords={[
					`riana shahid`,
					`blog`,
					`gatsby`,
					`new york`,
					`web developer`,
				]}
			/>

			<h1>all posts</h1>
			<div className='post-feed'>
				{/* this is the part that shows all the posts. I need to limit this or find a way to put whatever I want here */}

				{/* below is the original code */}
				{/* {posts.map(({ node }) => {
					// console.log(node)
					postCounter++;
					return (
						<PostCard
							key={node.fields.slug}
							count={postCounter}
							node={node}
							postClass={`post`}
						/>
					);
				})} */}
				{posts.map(({ node }) => {
					allpostCounter++;
					return (
						<PostCard
							key={node.fields.slug}
							count={allpostCounter}
							node={node}
							postClass={`post`}
						/>
					);
				})}
			</div>
		</Layout>
	);
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
            tags
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
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AllBlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
