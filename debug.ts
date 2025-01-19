/** Format string to debug print in frame. Frame width depends on content width. Terminal width not used to reshape wide strings.
 * @param values - is sequence of strings send as spread operator or comma separated strings
 * */
export function dformat(...values:string[]):string{
  let s = ""
  let w = 0
  let vx:string[][] = [] // collect multiline strings for each value splitted by new line
  
  for ( let v of values){
    const [wv, sx] = get_wsx(v) //sx - multiline string
    w = Math.max(w, wv)
    vx.push(sx)
  }
  
  const frame = "=".repeat(w)+"\n"

  if (vx.length > 0) s += frame

  for ( let sx of vx){ // get multiline string
    for (let i = 0; i < sx.length; i++){ s += center_inside(sx[i], w) + "\n" } // add
    s += frame // add
  }

  return s
}

/**
 * Return tuple of
 *  - width (number)
 *  - multiline string (string[])
 * 
 * If multiline string is empty, return [0, []]
 * 
 * width - is maximum width of multiline string + 4
 * (for decoration)
 * 
 * multiline string is incoming string splitted by new line
 */
function get_wsx(s:string):[number, string[]]{
  const sx = s.split("\n")
  const max_width = Math.max( ...sx.map(l=>l.length) )
  return (max_width > 0)?[max_width + 4, sx]:[0,[]]
}


/**
 * Returns a string centered inside of a field of width `max_width`.
 * The returned string is surrounded by "=" and has a space on either side of the
 * string `s`. The string `s` is centered by adding spaces to the left and right
 * of it until it fills the full width of `max_width`.
 * @param s the string to center
 * @param max_width the maximum width of the field
 */
function center_inside(s:string, max_width:number):string{
  const left = Math.floor((max_width - 4 - s.length) / 2)
  const right = Math.ceil((max_width - 4 - s.length) / 2)
  return "= " + " ".repeat(left) + s + " ".repeat(right) + " =" || ""
}
