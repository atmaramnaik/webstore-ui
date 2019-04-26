/**
 * Created by atmaramn on 9/18/17.
 */
import reducer from '../../reducers/products'
import * as types from '../../constants/actions/auth'
import * as group_types from '../../constants/actions/product'
import * as person_types from '../../constants/actions/person'
describe('user reducer', () => {
    it('should handle USERGROUPS_LOAD_SUCCESS', () => {
        var resp=[{id:3,name:'Group 3'},{id:4,name:'Group 4'}]
        expect(
            reducer(undefined, {
                type: group_types.USERGROUPS_LOAD_SUCCESS,
                data: resp
            })
        ).toEqual({my:{loaded:true,data: resp}})

        // expect(reducer({groups:[{id:1,name:"Group 1"},{id:2,name:'Group 2'}]}, {
        //     type: group_types.USERGROUPS_LOAD_SUCCESS,
        //     data: resp
        // })).toEqual({"groups": resp})
        //
        // expect(reducer({}, {
        //     type: group_types.USERGROUPS_LOAD_SUCCESS,
        //     data: []
        // })).toEqual({"groups": []})

    })
    it.skip('should handle OTHERGROUPS_LOAD_SUCCESS', () => {
        var resp=[{id:3,name:'Group 3'},{id:4,name:'Group 4'}]
        expect(
            reducer({}, {
                type: group_types.OTHERGROUPS_LOAD_SUCCESS,
                data: resp
            })
        ).toEqual({"other_groups": resp})

        expect(reducer({other_groups:[{id:1,name:"Group 1"},{id:2,name:'Group 2'}]}, {
            type: group_types.OTHERGROUPS_LOAD_SUCCESS,
            data: resp
        })).toEqual({"other_groups": resp})

    })
    it.skip('should handle GROUP_CREATE_SUCCESS', () => {
        var resp={id:3,name:'Group 3'}
        expect(
            reducer({groups:[],other_groups:[resp]}, {
                type: group_types.GROUP_CREATE_SUCCESS,
                data: resp
            })
        ).toEqual({groups: [resp],other_groups:[]})

        expect(reducer({groups:[{id:1,name:"Group 1"},{id:2,name:'Group 2'}],other_groups:[resp]}, {
            type: group_types.GROUP_CREATE_SUCCESS,
            data: resp
        })).toEqual({groups: [{id:1,name:"Group 1"},{id:2,name:'Group 2'},{id:3,name:'Group 3'}],other_groups:[]})

    })
    it.skip('should handle GROUP_JOIN_SUCCESS', () => {
        var resp={id:3,name:'Group 3'}
        expect(
            reducer({groups:[],other_groups:[resp]}, {
                type: group_types.GROUP_JOIN_SUCCESS,
                data: resp
            })
        ).toEqual({groups: [resp],other_groups:[]})

        expect(reducer({groups:[{id:1,name:"Group 1"},{id:2,name:'Group 2'}],other_groups:[resp]}, {
            type: group_types.GROUP_JOIN_SUCCESS,
            data: resp
        })).toEqual({groups: [{id:1,name:"Group 1"},{id:2,name:'Group 2'},{id:3,name:'Group 3'}],other_groups:[]})

    })
})