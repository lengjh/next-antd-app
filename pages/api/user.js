import Cors from 'micro-cors'

const cors = Cors({
    allowMethods: ['HEAD'],
})


export default cors((req, res) => {
    // console.log(req)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe', age: 1233, sex: 1 }))
})
// export const config = {
//     api: {
//         bodyParser: false,
//         bodyParser: {
//             sizeLimit: '0.0001kb',
//         },
//     },
// }