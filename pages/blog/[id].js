
const App = (obj) => {
    const { url } = obj;
    const { query } = url;
    const { id } = query;
    console.log(id);
    return `${id}`
}

export default App;