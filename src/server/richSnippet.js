

let snippet = function(title, images, description) {

	return  `{
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "headline": "${title}",
            "alternativeHeadline": "${title}",
            "image": [${images}],
            "datePublished": "",
            "description": "${description}",
            "articleBody": "${description}"
          }`;
}

export default snippet;
