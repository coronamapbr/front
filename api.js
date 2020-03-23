import axios from 'axios'

export const getChartPeopleWithSynthoms = (state = 'Bahia') => {
  const Axios = axios.create()
  Axios.defaults.headers.common['x-api-key'] = process.env.X_API_KEY
  return Axios
    .get(`https://ois93f6qt7.execute-api.us-east-2.amazonaws.com/default/insertData?estado=${state}`)
    .then(({ data }) => data)
}

export const getChartCasesConfirmed = () => {
  return axios
    .get(`https://pomber.github.io/covid19/timeseries.json`)
    .then(({ data }) => data.Brazil)
}

export const getChartCasesConfirmedBA = () => new Promise((resolve) => {
  const bkpCasesConfirmedBA = (resolvePromise) => {
    axios
      .get(`https://api.coronaanalytic.com/history/brazil/29`)
      .then(({ data }) => data.history)
      .then(history => resolvePromise(history.map(h => h.cases)))
  }

  axios
    .get(`https://raw.githubusercontent.com/elhenrico/covid19-Brazil-timeseries/master/confirmed-cases.csv`)
    .then(({ data }) => data.match(/^(Bahia)(.*)+/m)[0])
    .then(raw => raw.split(',').splice(2))
    .then(cases => {
      if (cases.length) {
        resolve([0, 0, 0, 0, ...cases.map(c => +c)])
      } else {
        bkpCasesConfirmedBA(resolve)
      }
    })
    .catch(() => {
      bkpCasesConfirmedBA(resolve)
    })
})
