import React from 'react'
import VenueSlugSelector from './VenueSlugSelector/VenueSlugSelector'
import UserCoordinates from './UserCoordinates/UserCoordinates'
import './styles/styles.css' //still experimental according to bun docs, so need to be imported in html as index.css
import CartValue from './CartValue/CartValue'
import PriceBreakdown from './PriceBreakdown'

export const DOPCalc: React.FC = () => {
  return (
    <div className='rays dopc'>
      <h2 className='title header'>Delivery Order Price Calculator</h2>
      <VenueSlugSelector />
      <UserCoordinates />
      <CartValue />
      <PriceBreakdown />
    </div>
  )
}
