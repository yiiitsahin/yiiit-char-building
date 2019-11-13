const state = {
    actionPoints: 15,
    allAbilities: [
        {
            id: 1,
            name: 'Agility',
            value: 5,
            max: 15
        },
        {
            id: 2,
            name: 'Speed',
            value: 5,
            max: 15
        },
        {
            id: 3,
            name: 'Power',
            value: 5,
            max: 15
        },
        {
            id: 4,
            name: 'Intelligence',
            value: 5,
            max: 20
        },
        {
            id: 5,
            name: 'Life',
            value: 5,
            max: 20
        }
    ]
};

const getters = {
    actionPoints(state) {
        return state.actionPoints;
    },
    allAbilities(state) {
        return state.allAbilities.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            return 0
        })
    }
};

const mutations = {
    increaseAbility(state, ability){
        if(ability.value < ability.max && state.actionPoints > 0) {
            state.actionPoints--;
            state.allAbilities.map(item => {
              if (item.id === ability.id && item.value !== item.max) item.value++;
            });
        }
    },
    decreaseAbility(state, ability){
        if(ability.value !== 0) {
            state.actionPoints++;
            state.allAbilities.map(item => {
              if (item.id === ability.id) item.value--;
            });
        }
    }
};

const actions = {
    increaseAbility( {commit}, ability ){
        commit('increaseAbility', ability)
    },
    decreaseAbility( {commit}, ability ){
        commit('decreaseAbility', ability)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}