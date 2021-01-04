import React from "react"
import { graphql, StaticQuery } from "gatsby"
// import { Redirect } from "react-router-dom"

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
  let artpostCounter = 0
  let latestpostCounter = 0
  let bookpostCounter = 0
  let lifestylepostCounter = 0
// console.log(posts)
  const artPosts = posts.filter((post) => post.node.frontmatter.tags.includes("arts"))
  const bookPosts = posts.filter((post) =>
		post.node.frontmatter.tags.includes('books')
	);
  const lifestylePosts = posts.filter((post) =>
		post.node.frontmatter.tags.includes('lifestyle')
	);
// console.log(artPosts)
  return (
		<Layout title={siteTitle}>
			<SEO
				title='Hello'
				keywords={[
					`riana shahid`,
					`blog`,
					`gatsby`,
					`new york`,
					`web developer`,
				]}
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
			<div className='post-header'>
				<h1>latest posts</h1>
				<h6>
					<a href='#art-posts'>arts</a>
				</h6>
				<h6>
					<a href='#book-posts'>books</a>
				</h6>
				<h6>
					<a href='#lifestyle-posts'>lifestyle</a>
				</h6>
				<h6>
					<a href='http://localhost:8000/allposts'>see all posts</a>
				</h6>
			</div>

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
				{posts.slice(0, 9).map(({ node }) => {
					latestpostCounter++;
					return (
						<PostCard
							key={node.fields.slug}
							count={latestpostCounter}
							node={node}
							postClass={`post`}
						/>
					);
				})}
			</div>
			<h1 id='art-posts'>arts</h1>
			<div className='post-feed'>
				{artPosts.slice(0, 6).map(({ node }) => {
					artpostCounter++;
					return (
						<PostCard
							key={node.fields.slug}
							count={artpostCounter}
							node={node}
							postClass={`post`}
						/>
					);
				})}
			</div>
			<h1 id='book-posts'>books</h1>
			<div className='post-feed'>
				{bookPosts.slice(0, 6).map(({ node }) => {
					bookpostCounter++;
					return (
						<PostCard
							key={node.fields.slug}
							count={bookpostCounter}
							node={node}
							postClass={`post`}
						/>
					);
				})}
			</div>
			<h1 id='lifestyle-posts'>lifestyle</h1>
			<div className='post-feed'>
				{lifestylePosts.slice(0, 6).map(({ node }) => {
					lifestylepostCounter++;
					return (
						<PostCard
							key={node.fields.slug}
							count={lifestylepostCounter}
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
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
