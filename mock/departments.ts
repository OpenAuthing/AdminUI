import mockjs from "mockjs";
import { defineMock } from "umi";

export default defineMock({
    'GET /api/departments': (req, res) => {
        const { parentId } = req.query
        console.log('parentId', parentId)
        setTimeout(() => {
            res.status(200).json(mockjs.mock({
                code: 200,
                'data|1-50': [{
                    id: '@guid',
                    name: '@ctitle(3,6)',
                    parentId: parentId
                }]
            }))
        }, mockjs.Random.integer(300, 3000));
    },

    'POST /api/departments': (req, res) => {
        setTimeout(() => {
            res.status(200).json(mockjs.mock({
                code: 200,
                data: '@guid'
            }))
        }, mockjs.Random.integer(300, 3000));
    },

    'PUT /api/departments/:id': (req, res) => {
        setTimeout(() => {
            res.status(200).json({
                code: 200,
                data: true
            })
        }, mockjs.Random.integer(300, 3000));
    },

    'DELETE /api/departments/:id': (req, res) => {
        setTimeout(() => {
            res.status(200).json({
                code: 200,
                data: true
            })
        }, mockjs.Random.integer(300, 3000));
    },

    'GET /api/departments/:departmentId/members': (req, res) => {
        const { pageSize = 20 } = req.params
        setTimeout(() => {
            res.status(200).json(mockjs.mock({
                code: 200,
                data: {
                    'totalCount': '@integer(0, 2000)',
                    'items|20': [{
                        id: '@guid',
                        userName: '@name(5,10)',
                        nickname: '@cname(3,6)',
                        emailAddress: '@email',
                        avatar: '@image("250x250")',
                        phoneNumber: '@natural(13000000000, 15600000000)',
                        'departments|1-5': [{
                            departmentId: '@guid',
                            departmentName: '@ctitle(2, 4)'
                        }]
                    }]
                }
            }))
        }, mockjs.Random.integer(300, 3000));
    },

    'POST /api/departments/:departmentId/members': (req, res) => {
        setTimeout(() => {
            res.status(200).json(mockjs.mock({
                code: 200,
                data: mockjs.Random.integer(0, 99)
            }))
        }, mockjs.Random.integer(300, 3000));
    },

    'PUT /api/departments/:departmentId/members/:userId/leader': (req, res) => {
        setTimeout(() => {
            res.status(200).json({
                code: 200,
                data: true
            })
        }, mockjs.Random.integer(300, 3000));
    }
})