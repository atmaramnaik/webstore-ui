
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/product'
import * as auth_action_types from '../../constants/actions/auth'
import * as types from '../../constants/actions/product'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Group actions', () => {
    beforeEach(()=>{nock.disableNetConnect()})
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create GROUP_CREATE_SUCCESS when create_group called', () => {
        const output = { id: 1, name : 'Group 1' }
        nock('http://localhost:8000/')
            .post('/group/create')
            .reply(200, output)

        const input = {name:"Group 1"}
        const expectedActions = [{
            type: types.GROUP_CREATE_SUCCESS,
            data:output
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.create_group(input)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create GROUP_JOIN_SUCCESS when join_group called', () => {
        const input = { id: 1, name : 'Group 1' }
        nock('http://localhost:8000/')
            .get('/group/1/join')
            .reply(200, input)

        const expectedActions = [{
            type: types.GROUP_JOIN_SUCCESS,
            data:input
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.join_group(input)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create USERGROUPS_LOAD_SUCCESS when loggedin user calls  load_my_groups', () => {
        const output = [{ id: 1, name : 'Group 1' },{id:2,name:'Group 2'}]
        nock('http://localhost:8000/')
            .get('/group/my')
            .reply(200, output)

        const expectedActions = [{
            type: types.USERGROUPS_LOAD_SUCCESS,
            data:output
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.load_my_groups()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create LOGOUT_SUCCESS when jwt expired user calls  load_my_groups', () => {
        nock('http://localhost:8000/')
            .get('/group/my')
            .reply(403)

        const expectedActions = [{
            type: auth_action_types.LOGOUT_SUCCESS
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.load_my_groups()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create OTHERGROUPS_LOAD_SUCCESS when loggedin user calls  load_other_groups', () => {
        const output = [{ id: 1, name : 'Group 1' },{id:2,name:'Group 2'}]
        nock('http://localhost:8000/')
            .get('/group/others')
            .reply(200, output)

        const expectedActions = [{
            type: types.OTHERGROUPS_LOAD_SUCCESS,
            data:output
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.load_other_groups()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create LOGOUT_SUCCESS when jwt expired user calls  load_other_groups', () => {
        nock('http://localhost:8000/')
            .get('/group/others')
            .reply(403)

        const expectedActions = [{
            type: auth_action_types.LOGOUT_SUCCESS
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.load_other_groups()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create GROUP_MESSAGE_SEND_SUCCESS when send_message called', () => {
        const input = { message : 'Hello' }
        nock('http://localhost:8000/')
            .post('/group/1/send')
            .reply(200, input)

        const expectedActions = [{
            type: types.GROUP_MESSAGE_SEND_SUCCESS
        }]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.send_message(1,input)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('should create GROUP_MESSAGES_LOAD_STARTED and GROUP_MESSAGES_LOAD_SUCCESS when loggedin user calls  load_messages', () => {
        const output = { hasMore: true, perPage : 3 ,data: [{id:1,message:'Message 1'},{id:2,message:'Message 2'},{id:3,message:'Message 3'}]}
        nock('http://localhost:8000/')
            .get('/group/1/messages?page=1')
            .reply(200, output)

        const expectedActions = [{
            type: types.GROUP_MESSAGES_LOAD_STARTED,
            group:1
        },{
            type: types.GROUP_MESSAGES_LOAD_SUCCESS,
            group:1,
            hasMore:true,
            perPage:3,
            data:output.data,
            currentPage:1
        }
        ]

        const store = mockStore({ user: [] })

        return store.dispatch(actions.load_messages(1,1)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})