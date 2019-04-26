/**
 * Created by atmaramn on 9/18/17.
 */
import reducer from '../../reducers/user'
import * as types from '../../constants/actions/auth'
import * as group_types from '../../constants/actions/product'
import * as person_types from '../../constants/actions/person'
describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({"isLoggedIn": false}
        )
    })

    it('should handle REGISTRATION_SUCCESS', () => {
        expect(
            reducer({}, {
                type: types.REGISTRATION_SUCCESS
            })
        ).toEqual({"isLoggedIn": true})
    })
    it('should handle LOGIN_SUCCESS', () => {
        expect(
            reducer({}, {
                type: types.LOGIN_SUCCESS
            })
        ).toEqual({"isLoggedIn": true})
    })
    it('should handle UNREGISTER_SUCCESS', () => {
        expect(
            reducer({}, {
                type: types.UNREGISTER_SUCCESS
            })
        ).toEqual({"isLoggedIn": false})
    })
    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            reducer({}, {
                type: types.LOGOUT_SUCCESS
            })
        ).toEqual({"isLoggedIn": false})
    })

    it('should handle USERFRIENDS_LOAD_SUCCESS', () => {
        var resp=[{id:3,name:'Friend 3'},{id:4,name:'Friend 4'}]
        expect(
            reducer({}, {
                type: person_types.USERFRIENDS_LOAD_SUCCESS,
                data: resp
            })
        ).toEqual({"friends": resp})

        expect(reducer({friends:[{id:1,name:"Friend 1"},{id:2,name:'Friend 2'}]}, {
            type: person_types.USERFRIENDS_LOAD_SUCCESS,
            data: resp
        })).toEqual({"friends": resp})

    })
})