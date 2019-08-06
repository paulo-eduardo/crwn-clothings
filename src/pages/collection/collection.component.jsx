import React from 'react'
import { connect } from 'react-redux'

import CollectionItem from '../../components/collection-item/collection-item.component'

import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.styles.scss'

const CollectionPage = ({ match, collection }) => {
  console.log('teste1', match)
  console.log('teste', collection)
  return (
    <div className="collection-page">
      <h2>COLLECTIONb PAGE</h2>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)
