import axios from 'axios'

const quietInstance = axios.create({
  baseURL: 'https://axelputra14.site/'
  // apabila membutuhkan header authorization
  //  (bearer / token / basic)
  //  bisa diletakkan di sini
})

export default quietInstance
