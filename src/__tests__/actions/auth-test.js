
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/auth'
import * as types from '../../constants/actions/auth'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth actions', () => {
    beforeEach(()=>{nock.disableNetConnect()})
    afterEach(() => {
        nock.cleanAll()
    })

    it('creates REGISTRATION_SUCCESS when registration has been done', () => {
        nock('http://localhost:8000/')
            .post('/register')
            .reply(200, { token: 'JWT Token' } )

        const input = {email:"atmaram","password":"test123$"}
        const expectedActions = [{
            type: types.REGISTRATION_SUCCESS
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.register(input)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('creates UNREGISTER_SUCCESS when un registration has been done', () => {
        nock('http://localhost:8000/')
            .delete('/unregister')
            .reply(200, { token: 'JWT Token' } )

        const input = {email:"atmaram","password":"test123$"}
        const expectedActions = [{
            type: types.UNREGISTER_SUCCESS
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.unregister()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('creates LOGIN_SUCCESS when login has been done', () => {
        nock('http://localhost:8000/')
            .post('/auth/login')
            .reply(200,{ token: 'JWT Token' } )

        const input = {email:"atmaram","password":"test123$"}
        const expectedActions = [{
            type: types.LOGIN_SUCCESS
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.login(input)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('creates LOGOUT_SUCCESS when logout has been done', () => {

        const expectedAction = [{
            type: types.LOGOUT_SUCCESS
        }]
        const store = mockStore({ user: [] })
        store.dispatch(actions.logout());
        expect(store.getActions()).toEqual(expectedAction)
    })
})