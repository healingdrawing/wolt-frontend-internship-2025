export const create_custom_alert = () => {
  let bad_inputs = 0; // closure to not garbage global stack, but one export for all to use only one variable, enough for the one alert at time

  return (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') { // Alert every second fail
      if (bad_inputs === 0) {
        alert('The value entered is not a valid venue slug. Please enter a valid value or select a value from the list.');
      } else if (bad_inputs > 1) {
        bad_inputs = -1;
      }
      bad_inputs++;
      e.currentTarget.focus();
    }
  };
};
/** checks the value+alert. if e.value === '' then alert every second fail */

export const custom_alert_for_input = create_custom_alert();

