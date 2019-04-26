/**
 * Created by atmaramn on 9/18/17.
 */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as core_apis from '../../api/core'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('core APIs', () => {
    beforeEach(()=>{nock.disableNetConnect()})
    afterEach(() => {
        nock.cleanAll()
    })

    it('should call public get when public_get called', () => {
        var scope = nock('http://localhost:8000/')
            .get('/test')
            .reply(200)


        return core_apis.public_get("/test").then((res) => {

            scope.done();
        })
    })
    it('should call public post when public_post called', () => {
        const output = { id: 1, name : 'Group 1' }
        var scope = nock('http://localhost:8000/')
            .post('/test',output)
            .reply(200)


        return core_apis.public_post("/test",output).then((res) => {

            scope.done();
        })
    })
    it('should call user get when user_get called', () => {
        var scope = nock('http://localhost:8000/')
            .get('/test')
            .reply(200)
        return core_apis.user_get("/test").then((res) => {

            scope.done();
        })
    })
})