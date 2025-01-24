import React, { useRef } from 'react'
import { useAtom } from 'jotai'
import { cart_value_atom } from '../../utils/atoms'
import { simulate_tab_event } from '../../utils/tab'

const CartValue: React.FC = () => {
  const input_ref = useRef<HTMLInputElement>(null)
  const [cart_value, set_cart_value] = useAtom(cart_value_atom)
  
  /** Validating float input, for EUR with cents */
  const currency_regex = /^(\d+)?(\.)?(\d{1,2})?$/

  /** to allow input, without black magic .5 etc */
  const wait_list = ['','.']

  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (wait_list.includes(value)) return
    else if (currency_regex.test(value)) set_cart_value(parseFloat(value))
    else e.target.value = cart_value === null ? '0' : cart_value.toString()
  }

  const handle_input_on_blur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (wait_list.includes(e.target.value)){
      set_cart_value(0)
      e.target.value = '0'
    }
  }

  const handle_key_up = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log("keyup value", e.currentTarget.value)
      if (e.currentTarget.value === ''){
        set_cart_value(0)
        e.currentTarget.value = '0'
      }
      simulate_tab_event(e.currentTarget)
    }
  }

  return (
    <div>
      <input
        type='text'
        data-test-id='cartValue'
        data-raw-value={cart_value !== null ? (cart_value * 100).toString() : ''}
        placeholder='Enter Cart Value (EUR)'
        onChange={handle_input_change}
        onBlur={handle_input_on_blur}
        onKeyUp={handle_key_up}
        ref={input_ref}
      />
    </div>
  )
}

export default CartValue
