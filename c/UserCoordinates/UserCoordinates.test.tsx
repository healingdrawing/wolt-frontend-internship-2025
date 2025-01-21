import { describe, it, expect } from 'bun:test'
import { render, fireEvent } from '@testing-library/react'
import UserCoordinates from './UserCoordinates'
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
  tcase('-', true),
  tcase('.', true),
  tcase('..', false),
  tcase('.9', true),
  tcase('.9.', false),
  tcase('z', false),
]

describe('UserCoordinates Component', () => {
  console.log(dformat('UserCoordinates.tsx testing', 'UserCoordinates.test.tsx'))
  it('render inputs with data-test-id', () => {
    const { container } = render(
      <UserCoordinates />
    )

    // Check if the input elements are rendered with the correct data-test-id
    const input_element_latitude = container.querySelector('[data-test-id="userLatitude"]') as HTMLInputElement
    expect(input_element_latitude).toBeDefined()

    const input_element_longitude = container.querySelector('[data-test-id="userLongitude"]') as HTMLInputElement
    expect(input_element_longitude).toBeDefined()
  })

  it('check default value is empty', () => {
    const { container } = render(
      <UserCoordinates />
    )

    const input_element_latitude = container.querySelector('[data-test-id="userLatitude"]') as HTMLInputElement
    input_element_latitude.dispatchEvent(new Event('input'))

    expect(input_element_latitude.value).toBe('')

    const input_element_longitude = container.querySelector('[data-test-id="userLongitude"]') as HTMLInputElement
    input_element_longitude.dispatchEvent(new Event('input'))

    expect(input_element_longitude.value).toBe('')
  })
  
  it('sets coordinates to 0 on blur if input is empty', () => {
    const { container } = render(
      <UserCoordinates />
    )

    const input_element_latitude = container.querySelector('[data-test-id="userLatitude"]') as HTMLInputElement
    input_element_latitude.dispatchEvent(new Event('input'))
    const focus_value_latitude = input_element_latitude.value
    fireEvent.blur(input_element_latitude)
    console.log('---\nlatitude',focus_value_latitude, '=>', input_element_latitude.value)
    expect(input_element_latitude.value).toBe('0')

    const input_element_longitude = container.querySelector('[data-test-id="userLongitude"]') as HTMLInputElement
    input_element_longitude.dispatchEvent(new Event('input'))
    const focus_value_longitude = input_element_longitude.value
    fireEvent.blur(input_element_longitude)
    console.log('---\nlongitude',focus_value_longitude, '=>', input_element_longitude.value)
    expect(input_element_longitude.value).toBe('0')
  })

  testing_data.forEach(({ raw_value, the_same }) => {
    it(`Format/regex test: updates input value to ${raw_value} and expect ${the_same?'the same value':'changed value'}`, () => {
      const { container } = render(
        <UserCoordinates />
      )

      const input_element_latitude = container.querySelector('[data-test-id="userLatitude"]') as HTMLInputElement
      fireEvent.change(input_element_latitude, { target: { value: raw_value } })
      console.log('---\nlatitude',raw_value, '=>', input_element_latitude.value)

      if (the_same) expect(input_element_latitude.value).toBe(raw_value)
      else expect(input_element_latitude.value).not.toBe(raw_value)
      
      const input_element_longitude = container.querySelector('[data-test-id="userLongitude"]') as HTMLInputElement
      fireEvent.change(input_element_longitude, { target: { value: raw_value } })
      console.log('---\nlongitude',raw_value, '=>', input_element_longitude.value)

      if (the_same) expect(input_element_longitude.value).toBe(raw_value)
      else expect(input_element_longitude.value).not.toBe(raw_value)

    })
  })
  
})
