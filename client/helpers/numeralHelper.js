const numberColors = {
  1: 'rgb(189,189,189)',
  2: 'rgb(97,97,97)',
  3: 'rgb(0,0,0)',
  4: 'rgb(33,150,243)',
  5: 'rgb(244,67,54)',
  6: 'rgb(255,235,59)',
  7: 'rgb(76,175,80)',
  8: 'rgb(255,152,0)',
  9: 'rgb(103,58,183)'
}


const totalNumber = num => {
  return num.toString().split('').map(n => +n).reduce((c, n) => c + n)
}

const reduceNumber = num => {
  const tally = totalNumber(num)

  if (tally.toString().length > 1) {
    return reduceNumber(totalNumber(tally))
  }

  return tally;
}

const coloredNumber = num => {
  let color = ''
  Object.getOwnPropertyNames(numberColors).forEach((prop, i, arr) => {
    if (+prop === num) {
      color = numberColors[prop]
    }
  })

  return color
}

export const getColor = num => {
  return coloredNumber(reduceNumber(num))
}
