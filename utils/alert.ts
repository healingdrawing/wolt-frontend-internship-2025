/** checks the value+alert. if e.value === '' then alert every second fail */
const create_custom_alert = (m:string) => {
  let bad_inputs = 0 // closure to not garbage global stack, but one export for all to use only one variable, enough for the one alert at time

  return (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') { // Alert every odd (1 0 1 0 1) fail
      if (bad_inputs === 0) {
        alert(m)
      } else if (bad_inputs > 1) {
        bad_inputs = -1
      }
      bad_inputs++
      e.currentTarget.focus()
    }
  };
};



/** check. if fail then alert + refocus */
export const custom_alert_for_slug_select = create_custom_alert('The value entered is not a valid venue slug. Please enter a valid value or select a value from the list.')

/** check. if fail then alert + refocus */
export const custom_alert_for_float_input = create_custom_alert('custom alert one minus, one period, numbers are allowed')
