import { describe, it, expect } from 'bun:test'
import { render, fireEvent } from '@testing-library/react'
import CartValue from './CartValue'
import { dformat } from '../../debug/debug'


interface Test_Set_Value_Case{
  raw_value: string
  the_same: boolean
}

/** test case to check input */
const tcase = (
  input:string, // new value
  the_same:boolean // the expected result after filtering is same as input
):Test_Set_Value_Case => ({raw_value: input, the_same})

const testing_data:Test_Set_Value_Case[] = [
  tcase('', true),
  tcase('-', false),
  tcase('.', true),
  tcase('..', false),
  tcase('.8', true),
  tcase('.8.', false),
  tcase('a', false),
]

describe('CartValue Component', () => {
  console.log(dformat("CartValue.tsx testing", "CartValue.test.tsx"))
  it('renders input with data-test-id', () => {
    const { container } = render(
      <CartValue />
    )

    // Check if the input element is rendered with the correct data-test-id
    const inputElement = container.querySelector('[data-test-id="cartValue"]') as HTMLInputElement
    expect(inputElement).toBeDefined()
  })

  it('check default cart value is empty', () => {
    const { container } = render(
      <CartValue />
    )

    const inputElement = container.querySelector('[data-test-id="cartValue"]') as HTMLInputElement;
    inputElement.dispatchEvent(new Event('input'))

    expect(inputElement.value).toBe('')
  })

  testing_data.forEach(({ raw_value, the_same }) => {
    it(`Format/regex test: updates input cart value to ${raw_value} and expect ${the_same?'the same value':'changed value'}`, () => {
      const { container } = render(
        <CartValue />
      )

      const inputElement = container.querySelector('[data-test-id="cartValue"]') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: raw_value } })
      console.log("---\n",raw_value, '=>', inputElement.value)

      if (the_same) expect(inputElement.value).toBe(raw_value)
      else expect(inputElement.value).not.toBe(raw_value)
      // fireEvent.change(inputElement, { target: { value: '' } }) // commented, to follow real implementation with auto format and backup input value in case of bad input
    })
  })
  
})
