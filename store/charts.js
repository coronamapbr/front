export const state = () => ({
  dates: [],
  confirmedCasesBR: [],
  confirmedCasesBA: [],
  peopleWithSymptoms: []
})

export const mutations = {
  addDates(state, dates) {
    state.dates.push(...dates)
  },
  addConfirmedCasesBR(state, confirmedCasesBR) {
    state.confirmedCasesBR.push(...confirmedCasesBR)
  },
  addConfirmedCasesBA(state, confirmedCasesBA) {
    state.confirmedCasesBA.push(...confirmedCasesBA)
  },
  addPeopleWithSymptoms(state, peopleWithSymptoms) {
    state.peopleWithSymptoms.push(...peopleWithSymptoms)
  }
}
