import axios from "axios";

let data = {}

const main = async () => {

  const response = await axios.get(
    `http://localhost:8080/`
  );

  console.log(response.data);

  return data = response.data
};

const mainTwo = async () => {

  const response = await axios.post('http://localhost:8080/', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
};

const but = document.getElementById('but')
const container = document.getElementById('container')

but.addEventListener('click', async () => {
  await main();
  container.innerHTML = JSON.stringify(data)
})

