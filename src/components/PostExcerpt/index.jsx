import React from 'react'
import Link from 'gatsby-link'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import Adsense from '../Adsense'
import './style.scss'
import * as path from 'path'

class PostExcerpt extends React.Component {
  more(path) {
    return (
      <Link className="readmore" to={path}>
        <span className="btn btn-outline-primary btn-block">MORE</span>
      </Link>
    )
  }

  isMore(body) {
    return body.match('<!--more-->')
  }

  description(body) {
    let test = body.replace(/<blockquote>/g, '<blockquote class="blockquote">')
    if (test.match('<!--more-->')) {
      test = test.split('<!--more-->')
      if (typeof test[0] !== 'undefined') {
        return test[0]
      }
    }
    return test
  }

  categories(data) {
    const categories = []
    forEach(data, (item, i) => {
      categories.push(
        <span className="badge badge-primary text-white" key={i}>
          {item}
        </span>
      )
    })
    return categories
  }

  parseDate(filePath) {
    const directoryName = path.basename(path.dirname(filePath))
    const directoryDate = directoryName.match(
      /^(19|20)\d\d([- /.])(([0-1]?)[1-9]|1[012])\2(([0-1]?)[1-9]|[12][0-9]|3[01])/
    )[0]
    return (
      new Date(directoryDate)
        .toISOString()
        .replace('-', '/')
        .split('T')[0]
        .replace('-', '/') || ''
    )
  }

  render() {
    const { site, data, isIndex } = this.props
    const title = get(data, 'frontmatter.title')
    const path = get(data, 'frontmatter.path')
    const date = data.frontmatter.date || this.parseDate(data.fileAbsolutePath)
    const excerpt = get(data, 'excerpt')

    const cate =
      get(data, 'frontmatter.category') || get(data, 'frontmatter.categories')
    const ad = isIndex ? (
      ''
    ) : (
      <Adsense clientId={site.meta.adsense} slotId="" format="auto" />
    )

    return (
      <div className="container">
        <div className="articles col-md-12">
          <div className="article-wrap" key={path}>
            <div className="page-header">
              <Link style={{ boxShadow: 'none' }} to={path}>
                <h1>{title}</h1>
                <time dateTime={date}>{date}</time>
              </Link>
              {this.categories(cate)}
            </div>
            {ad}
            <div className="page-content">
              {excerpt}
              <div className="read-link">
                <Link to={path}>Read More</Link>
              </div>
            </div>
            {ad}
          </div>
        </div>
      </div>
    )
  }
}

export default PostExcerpt
