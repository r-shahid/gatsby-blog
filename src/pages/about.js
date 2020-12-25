import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "./../../content/assets/riana-in-bk.jpg"
// import resume from "./../../content/assets/resume-snippet.png"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../style/normalize.css"
import "../style/all.scss"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
		<Layout title={siteTitle}>
			<SEO title='About' keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

			<article className='post-content page-template no-image'>
				<div className='post-content-body'>
					<h2 id='about-header'>
						Lifestyle blogger and full stack developer based in New York City.
						Stay here for the latest in NYC's art world, literature, and beauty
						& lifestyle content. Check out my developer portfolio{' '}
						<a
							href='https://r-shahid.github.io'
							target='_blank'
							rel='noreferrer'>
							here
						</a>
						.
					</h2>
					<figure className='kg-card kg-image-card kg-width-full'>
						{/* <Img
							// fluid={data.benchAccounting.childImageSharp.fluid}
							// className='kg-image'
						/> */}
						<div className='img-container'>
							<div>
								<img className='about-img' src={Img} alt='riana in brooklyn' />
								<figcaption>
									Throwback to exploring the city in a pre-COVID time
								</figcaption>
							</div>
						</div>
					</figure>
					<h3 id='dynamic-styles'>Hi, I'm Riana</h3>
					<p>
						Ever since I was young, I've had an interest in the arts. As I got
						older, I embraced my analytical side throughout my academic career.
						I have a Bachelor of Arts in Mathematics from New York University
						and studied software engineering at General Assembly.
					</p>
					<p>
						These days, I combine the two fields with clean code and even
						cleaner design. Outside of coding, my interests lie in content
						creation through product photography and long-form blog posts as
						well as painting and the fiber arts.
					</p>
					{/* <div className='about-bottom'>
            <a href='https://r-shahid.github.io'>
              <img src={resume} alt="resume and link to portfolio" />
            </a>
            <br />
            Click the image to visit my portfolio page.
            
          </div> */}
				</div>
			</article>
		</Layout>
	);
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    benchAccounting: file(
      relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
