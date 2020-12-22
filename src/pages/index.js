import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import Bio from "../components/bio"
import PostCard from "../components/postCard"

import "../style/normalize.css"
import "../style/all.scss"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0

  return (
		<Layout title={siteTitle}>
			<SEO
				title='Blog'
				keywords={[`devlog`, `blog`, `gatsby`, `javascript`, `react`]}
			/>
			{/* <Bio /> */}
			{data.site.siteMetadata.description && (
				<header className='page-head'>
					<h2 className='page-head-title my-blurb'>
						{data.site.siteMetadata.description}
					</h2>
					<div className='dave-eggers-the-circle'></div>
				</header>
			)}
      <h1>latest posts</h1> <a href='#some-posts'>A limited number of posts</a>
			<div className='post-feed'>
				{/* this is the part that shows all the posts. I need to limit this or find a way to put whatever I want here */}
				{posts.map(({ node }) => {
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
				})}
			</div>
			<h1 id='some-posts'>a limited number of posts</h1>
			<div className='post-feed'>
				{/* 
        ==================================================================================== 
        ==================================================================================== 
                               this div shows only a few posts 
        ==================================================================================== 
        ====================================================================================
        */}
				{posts.slice(0,3).map(({ node }) => {
          let i=0
							return (
								<PostCard
									key={node.fields.slug}
									count={postCounter}
									node={node}
									postClass={`post`}
								/>
              );

					postCounter++;
				})}
			</div>
			<h1>Posts by category</h1>
			<div className='post-feed'>
				{/* 
        ==================================================================================== 
        ==================================================================================== 
                               this div filters by tag 
        ==================================================================================== 
        ====================================================================================
        */}
				{posts.map(({ node }) => {
					let tagArr = node.frontmatter.tags;
					if (tagArr) {
						if (
							tagArr.includes('vaporwave') ||
							tagArr.includes('pink') ||
							tagArr.includes('blue') ||
							tagArr.includes('green')
						) {
							return (
								<PostCard
									key={node.fields.slug}
									count={postCounter}
									node={node}
									postClass={`post`}
								/>
							);
						}
					}

					postCounter++;
					// if (node.frontmatter.tags.includes("pink")){
					// return (
					//             <PostCard
					//               key={node.fields.slug}
					//               count={postCounter}
					//               node={node}
					//               postClass={`post`}
					//             />
					//           );
					// }
				})}
				{/* <h1>this is my home page</h1> */}
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
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
