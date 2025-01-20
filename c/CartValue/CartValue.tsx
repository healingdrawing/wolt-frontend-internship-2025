import React, { useRef } from 'react'
import { useAtom } from 'jotai'
import { cart_value_atom } from '../../utils/atoms'
import { custom_alert_for_float_input } from '../../utils/alert'
import { simulate_tab_event } from '../../utils/tab'

const CartValue: React.FC = () => {
  const input_ref = useRef<HTMLInputElement>(null)
  const [cart_value, set_cart_value] = useAtom(cart_value_atom)
  
  /** Validating float input, for EUR with cents */
  const currency_regex = /^(\d+)?(\.)?(\d{1,2})?$/

  /** to allow input, without black magic. -.5 etc */
  const wait_list = ['.','-','-.']

  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (currency_regex.test(value) || value === '') {
      if (!wait_list.includes(value))
      {
        set_cart_value(value === '' ? null : parseFloat(value))
      }
    } else {
      e.target.value = cart_value === null ? '' : cart_value.toString()
    }
  }

  const handle_input_on_blur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!currency_regex.test(value) && value !== '') {
      e.target.value = ''
      custom_alert_for_float_input(e)
    }
  }

  const handle_key_up = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      simulate_tab_event(e.currentTarget)
    }
  }

  return (
    <div>
      <label htmlFor='cart-value'>Cart Value (EUR):</label>
      <input
        type='text'
        id='cart-value'
        data-test-id='cartValue'
        data-raw-value={cart_value !== null ? (cart_value * 100).toString() : ''}
        placeholder='Enter Cart Value'
        onChange={handle_input_change}
        onBlur={handle_input_on_blur}
        onKeyUp={handle_key_up}
        ref={input_ref}
      />
    </div>
  )
}

export default CartValue
