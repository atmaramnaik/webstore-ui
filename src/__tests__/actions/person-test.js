
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/person'
import * as auth_action_types from '../../constants/actions/auth'
import * as types from '../../constants/actions/person'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Group actions', () => {
    beforeEach(()=>{nock.disableNetConnect()})
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create USERFRIENDS_LOAD_SUCCESS when load_my_friends called', () => {
        const output = [{id: 1},{id:2}]
        nock('http://localhost:8000/')
            .get('/person/my')
            .reply(200, output)

        const expectedActions = [{
            type: types.USERFRIENDS_LOAD_SUCCESS,
            data:output
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.load_my_friends()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create USERFRIEND_REQUESTS_LOAD_SUCCESS when becomeFriends called', () => {
        const output = [{id: 1},{id:2}]
        const id=1
        nock('http://localhost:8000/')
            .get('/person/'+id+'/friend')
            .reply(200, output)

        const expectedActions = [{
            type: types.BECOMEFRIENDS_SUCCESS,
            data:output
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.becomeFriends(1)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create USERFRIEND_REQUESTS_LOAD_SUCCESS when my_friend_requests called', () => {
        const output = [{id: 1},{id:2}]
        nock('http://localhost:8000/')
            .get('/person/friendRequests')
            .reply(200, output)

        const expectedActions = [{
            type: types.USERFRIEND_REQUESTS_LOAD_SUCCESS,
            data:output
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.my_friend_requests()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create ACCEPT_FRIENDSHIP_SUCCESS when accept_friendship called', () => {
        const output = {id: 1}
        nock('http://localhost:8000/')
            .get('/person/1/acceptFriendship')
            .reply(200, output)

        const expectedActions = [{
            type: types.ACCEPT_FRIENDSHIP_SUCCESS,
            data:output
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.accept_friendship(1)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})