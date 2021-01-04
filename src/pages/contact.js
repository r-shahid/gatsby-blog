import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faTwitter,
    faInstagram,
    faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/layout';
import SEO from '../components/seo';
import Img from '../../content/assets/riana-in-the-park.jpg'

import '../style/normalize.css';
import '../style/all.scss';

const ContactPage = ({ data }, location) => {
	const siteTitle = data.site.siteMetadata.title;
	// console.log(siteTitle)

	return (
		<Layout title={siteTitle}>
			<SEO title='Contact' keywords={[`blog`, `gatsby`, `lifestyle`, `new york`, `blogger`]} />

			<article className='post-content page-template no-image'>
				<div className='contact-page'>
					<div className='left-text'>
						<h2>Contact Me</h2>
						<p>
							Get in touch with me with the contact form below or by emailing me
							at <a href='mailto:info@rianashahid.com'>info@rianashahid.com</a>
						</p>
						<div className='social-icons grow'>
							<a
								href='https://instagram.com/rianashahid'
								target='_blank'
								rel='noreferrer'>
								<FontAwesomeIcon icon={faInstagram} />
							</a>
							<a
								href='https://twitter.com/rianashahid'
								target='_blank'
								rel='noreferrer'>
								<FontAwesomeIcon icon={faTwitter} />
							</a>
							<a
								href='mailto:info@rianashahid.com'
								target='_blank'
								rel='noreferrer'>
								<FontAwesomeIcon icon={faEnvelope} />
							</a>
							<a
								href='https://linkedin.com/in/rianashahid'
								target='_blank'
								rel='noreferrer'>
								<FontAwesomeIcon icon={faLinkedinIn} />
							</a>
							<a
								href='https://github.com/r-shahid'
								target='_blank'
								rel='noreferrer'>
								<FontAwesomeIcon icon={faGithub} />
							</a>
						</div>
					</div>
					<div className='contact-media'>
						{/* <div className='background'></div>
						<div className='background-two'></div> */}
						<div className='image'>
							<img src={Img} alt='riana in the park' />
						</div>
					</div>
				</div>
				<div class='contactform'>
					<h3>Get in touch</h3>
					<form action='https://formspree.io/xoqpapnd' method='POST'>
						<input type='text' placeholder='YOUR NAME' name='_name' />
						<input type='text' placeholder='YOUR EMAIL' name='_replyto' />
						<textarea
							rows='5'
							placeholder='YOUR MESSAGE'
							name='message'></textarea>
						<br />
						<input class='submit' value='Submit' type='submit' />
					</form>
				</div>
			</article>
		</Layout>
	);
};

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
`;

export default (props) => (
	<StaticQuery
		query={indexQuery}
		render={(data) => (
			<ContactPage location={props.location} data={data} {...props} />
		)}
	/>
);
