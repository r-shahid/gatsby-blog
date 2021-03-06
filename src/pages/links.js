import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

import "../style/normalize.css"
import "../style/all.scss"

const AllLinks = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  let recentpostCounter = 0
  console.log(posts)

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

			<h1>latest posts</h1>
			<div className='post-feed'>
				{posts.slice(0,3).map(({ node }) => {
					recentpostCounter++;
					return (
						<>
							<a href={`http://localhost:8000${node.fields.slug}`} target="_blank">
								<h1>{node.frontmatter.title}</h1>
							</a>
							{/* <PostCard
							key={node.fields.slug}
							count={recentpostCounter}
							node={node}
							postClass={`post`}
						/> */}
						</>
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
      <AllLinks location={props.location} props data={data} {...props} />
    )}
  />
)
